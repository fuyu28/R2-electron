// awsErrorHandler.ts
import { NoSuchBucket, S3ServiceException } from '@aws-sdk/client-s3'

/**
 * AWS SDK のエラーを一元処理し、
 * ・握りつぶして null を返すもの
 * ・再スローすべきもの
 * を切り分けます。
 *
 * @param error  キャッチしたエラーオブジェクト
 * @param context { operation: 操作名, bucket?: 対象バケット名 など }
 * @returns null または never（再スロー）
 */
export function handleAwsError(
  error: unknown,
  context: { operation: string; bucket?: string }
): null {
  const { operation, bucket } = context
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any
  const name = err.name as string | undefined
  const code = err.code as string | undefined

  // バケットが見つからない
  if (error instanceof NoSuchBucket || name === 'NoSuchBucket' || code === 'NoSuchBucket') {
    console.warn(`[${operation}] バケットが存在しません${bucket ? `: ${bucket}` : ''}`)
    return null
  }

  // アクセス拒否
  if (name === 'AccessDenied' || code === 'AccessDenied') {
    console.warn(`[${operation}] アクセスが拒否されました${bucket ? `: ${bucket}` : ''}`)
    return null
  }

  // タイムアウト（SDK 内部で name='TimeoutError' になるケース）
  if (name === 'TimeoutError' || code === 'TimeoutError') {
    console.error(`[${operation}] リクエストがタイムアウトしました`)
    return null
  }

  // DNS 解決失敗や接続拒否など、Node 組み込みのネットワークエラー
  if (
    code === 'ENOTFOUND' ||
    code === 'EAI_AGAIN' ||
    code === 'ECONNREFUSED' ||
    code === 'EHOSTUNREACH'
  ) {
    console.error(`[${operation}] ネットワーク接続エラー (${code})`)
    return null
  }

  // その他の S3 系サービス例外
  if (error instanceof S3ServiceException) {
    console.error(
      `[${operation}] S3サービスエラー (${(error as S3ServiceException).$fault}):`,
      error
    )
    // 必要に応じて null を返すか再スローを選ぶ
    throw error
  }

  // 上記以外の予期せぬエラーは再スロー
  console.error(`[${operation}] 予期しないエラー:`, error)
  throw error
}

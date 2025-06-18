import { join, dirname, relative } from 'path'
import { promises as fs } from 'fs'
import { ipcMain } from 'electron'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { r2Client } from '../r2Client'

export function registerDownloadHandlers(): void {
  ipcMain.handle(
    'download-folder',
    async (
      _event,
      localFolderPath: string,
      r2DestinationPath: string
    ): Promise<{ success: boolean }> => {
      try {
        // 1) R2 から prefix 配下のオブジェクト一覧を取得（ページネーション対応）
        const allKeys: string[] = []
        let token: string | undefined = undefined
        do {
          const listRes = await r2Client.send(
            new ListObjectsV2Command({
              Bucket: process.env.BUCKET_NAME,
              Prefix: r2DestinationPath.replace(/\/+$/, '') + '/', // 確実に末尾に `/`
              ContinuationToken: token
            })
          )
          // Contents に含まれるキーを拾う
          listRes.Contents?.forEach((obj) => {
            if (obj.Key) allKeys.push(obj.Key)
          })
          token = listRes.NextContinuationToken
        } while (token)

        // 2) 取得したキーごとにダウンロード＆ローカル保存
        for (const key of allKeys) {
          // r2DestinationPath を除いた相対パスを localFolderPath 配下に作る
          const relativePath = relative(r2DestinationPath, key)
          const outputPath = join(localFolderPath, relativePath)

          // 保存先ディレクトリがなければ作成
          await fs.mkdir(dirname(outputPath), { recursive: true })

          // オブジェクト取得
          const getRes = await r2Client.send(
            new GetObjectCommand({
              Bucket: process.env.BUCKET_NAME,
              Key: key
            })
          )

          // Body（ReadableStream）をローカルファイルに書き出し
          const bodyStream = getRes.Body as NodeJS.ReadableStream
          const fileHandle = await fs.open(outputPath, 'w')
          await new Promise<void>((resolve, reject) => {
            const writeStream = fileHandle.createWriteStream()
            bodyStream
              .pipe(writeStream)
              .on('finish', () => {
                writeStream.close()
                resolve()
              })
              .on('error', reject)
          })
        }

        return { success: true }
      } catch (err) {
        console.error(err)
        return { success: false }
      }
    }
  )
}

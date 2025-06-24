import React, { useEffect, useState } from 'react'
import { useCredentials } from '@renderer/context/CredentialsContext'

type Status = 'loading' | 'success' | 'error'

export default function StatusPage(): React.JSX.Element {
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { hasValidCreds, creds } = useCredentials()

  useEffect(() => {
    // クレデンシャルの状態が変化したらステータス更新
    if (hasValidCreds) {
      setStatus('success')
    } else {
      setErrorMessage('クレデンシャルが有効ではありません')
      setStatus('error')
    }
  }, [hasValidCreds])

  return (
    <div className="flex-1 bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">ステータス確認</h2>

          {status === 'loading' && (
            <div className="flex flex-col items-center space-y-2">
              <span className="loading loading-spinner loading-lg"></span>
              <span>接続を確認中...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="alert alert-success">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{creds?.bucketName} とのコネクションに成功しました！</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="alert alert-error">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>R2と接続できませんでした: {errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

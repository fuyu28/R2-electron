import React, { useEffect, useState } from 'react'
import { FaCheck, FaSyncAlt, FaTimes } from 'react-icons/fa'
import { useCredentials } from '@renderer/context/CredentialsContext'

type Status = 'loading' | 'success' | 'error'

export default function StatusPage(): React.JSX.Element {
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { hasValidCreds, creds } = useCredentials()

  useEffect(() => {
    if (hasValidCreds) {
      setStatus('success')
    } else {
      setErrorMessage('クレデンシャルが有効ではありません')
      setStatus('error')
    }
  }, [hasValidCreds])

  return (
    <div className="flex justify-center p-4 bg-base-200 w-full mx-auto">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title">現在のステータス</h2>

          {status === 'loading' && (
            <div className="flex flex-col items-center space-y-2">
              <FaSyncAlt className="animate-spin text-4xl text-gray-600" />
              <span>接続を確認中...</span>
            </div>
          )}

          {status === 'success' && (
            <div className="alert alert-success">
              <div className="flex space-x-2">
                <FaCheck className="text-xl" />
                <span>バケット名 : {creds?.bucketName} に接続中</span>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="alert alert-error">
              <div className="flex space-x-2">
                <FaTimes className="text-xl" />
                <span>R2と接続できませんでした: {errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

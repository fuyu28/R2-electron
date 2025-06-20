import { useState, useEffect } from 'react'
import { useCredentials } from '@renderer/context/CredentialsContext'

export default function SettingsPage(): React.JSX.Element {
  const [bucketName, setBucketName] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [region, setRegion] = useState('')
  const [accessKeyId, setAccessKeyId] = useState('')
  const [secretAccessKey, setSecretAccessKey] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const { creds, reloadCreds } = useCredentials()

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (toast) {
      timer = setTimeout(() => setToast(null), 3000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [toast])

  useEffect(() => {
    ;(async () => {
      if (creds) {
        setBucketName(creds.bucketName)
        setEndpoint(creds.endpoint)
        setRegion(creds.region)
        setAccessKeyId(creds.accessKeyId)
        setSecretAccessKey(creds.secretAccessKey)
      }
    })()
  }, [creds])

  const saveAll = async (): Promise<void> => {
    setToast(null)
    const res = await window.api.credential.setCredential({
      bucketName,
      endpoint,
      region,
      accessKeyId,
      secretAccessKey
    })
    if (res.success) {
      const isValid = await reloadCreds()
      if (isValid) {
        setToast({ message: 'クレデンシャルの保存に成功しました', type: 'success' })
      } else {
        setToast({ message: '誤ったクレデンシャルが指定されています', type: 'error' })
      }
    } else {
      setToast({ message: 'クレデンシャルの保存に失敗しました', type: 'error' })
    }
  }

  return (
    <div className="relative container mx-auto px-6 mt-10">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 alert shadow-lg ${
            toast.type === 'success' ? 'alert-success' : 'alert-error'
          } animate-fade-in-down`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      <div className="card w-full bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">R2/S3 設定</h2>

          <div className="flex flex-col space-y-4">
            {/* ラベルの幅を固定し、入力欄を揃えるレイアウト */}
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Bucket Name</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                placeholder="バケット名を入力"
              />
            </div>
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Endpoint</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                placeholder="https://<アカウント>.r2.cloudflarestorage.com"
              />
            </div>
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Region</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="auto"
              />
            </div>
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Access Key ID</span>
              <input
                type="text"
                className="input input-bordered flex-1"
                value={accessKeyId}
                onChange={(e) => setAccessKeyId(e.target.value)}
                placeholder="アクセスキーを入力"
              />
            </div>
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Secret Access Key</span>
              <input
                type="password"
                className="input input-bordered flex-1"
                value={secretAccessKey}
                onChange={(e) => setSecretAccessKey(e.target.value)}
                placeholder="シークレットアクセスキーを入力"
              />
            </div>
          </div>

          <div className="form-control mt-6 flex justify-end">
            <button className="btn btn-primary" onClick={saveAll}>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

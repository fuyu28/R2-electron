import { useState, useEffect } from 'react'

export default function SettingsPage(): React.JSX.Element {
  const [bucketName, setBucketName] = useState('')
  const [endpoint, setEndpoint] = useState('')
  const [region, setRegion] = useState('')
  const [accessKeyId, setAccessKeyId] = useState('')
  const [secretKey, setSecretKey] = useState('')

  // useEffect(() => {
  //   setBucketName(window.settingsAPI.get('BUCKET_NAME') ?? '')
  //   setEndpoint(window.settingsAPI.get('ENDPOINT') ?? '')
  //   setRegion(window.settingsAPI.get('REGION') ?? '')
  //   setAccessKeyId(window.settingsAPI.get('ACCESS_KEY_ID') ?? '')
  //   window.secretAPI.getSecret('SECRET_ACCESS_KEY').then((pw) => {
  //     setSecretKey(pw ?? '')
  //   })
  // }, [])

  // const saveAll = async () => {
  //   window.settingsAPI.set('BUCKET_NAME', bucketName)
  //   window.settingsAPI.set('ENDPOINT', endpoint)
  //   window.settingsAPI.set('REGION', region)
  //   window.settingsAPI.set('ACCESS_KEY_ID', accessKeyId)
  //   await window.secretAPI.setSecret('SECRET_ACCESS_KEY', secretKey)
  //   window.myAPI.notify('設定を保存しました')
  // }

  return (
    <div className="container mx-auto px-6 mt-10">
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
              />
            </div>
            <div className="flex items-center">
              <span className="w-36 text-sm font-medium">Secret Access Key</span>
              <input
                type="password"
                className="input input-bordered flex-1"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          </div>
          <div className="form-control mt-6 flex justify-end">
            <button className="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    </div>
  )
}

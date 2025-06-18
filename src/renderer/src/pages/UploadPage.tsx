import { useState } from 'react'

export default function UploadPage(): React.JSX.Element {
  const [localFolderPath, setLocalFolderPath] = useState<string | null>(null)
  const [R2DestinationPath, setR2DestinationPath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleOpen = async (): Promise<void> => {
    const selected = await window.api.fileDialog.selectFolder()
    setLocalFolderPath(selected)
    if (selected) {
      const parts = selected
        .replace(/[\\/]+$/, '')
        .split(/[\\/]+/)
        .filter(Boolean)
      setR2DestinationPath(parts.length >= 2 ? parts[parts.length - 2] : '')
    }
  }

  const handleUpload = async (): Promise<void> => {
    setError(null)
    setSuccess(null)
    if (!localFolderPath || !R2DestinationPath) return
    setLoading(true)
    try {
      const result = await window.api.upload.uploadFolder(localFolderPath, R2DestinationPath)
      if (result.success) setSuccess('アップロードが完了しました🎉')
      else setError('アップロードに失敗しました😢')
    } catch {
      setError('予期せぬエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto font-sans flex flex-col space-y-6 p-6">
      <h1 className="text-2xl font-bold text-center">Folder Upload</h1>

      {/* フォルダ選択 */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">フォルダを選択</span>
        </label>
        <button
          onClick={handleOpen}
          disabled={loading}
          className={`btn w-full ${loading ? 'btn-disabled' : 'btn-primary'}`}
        >
          {loading ? 'Opening…' : 'Folder Open'}
        </button>
      </div>

      {/* アップロード先パス入力 */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">アップロード先フォルダ名を入力</span>
        </label>
        <input
          type="text"
          value={R2DestinationPath ?? ''}
          onChange={(e) => setR2DestinationPath(e.target.value === '' ? null : e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* 選択パスの表示 */}
      {localFolderPath && (
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">選択されたパス</span>
          </label>
          <p className="whitespace-pre-wrap text-sm text-gray-700">{localFolderPath}</p>
        </div>
      )}

      {/* アップロードボタン */}
      <div className="form-control w-full">
        <button
          onClick={handleUpload}
          disabled={!R2DestinationPath || loading}
          className={`btn w-full ${!R2DestinationPath || loading ? 'btn-disabled' : 'btn-primary'}`}
        >
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      </div>

      {/* ステータスメッセージ */}
      {error && <p className="text-error text-center">❌ {error}</p>}
      {success && <p className="text-success text-center">✅ {success}</p>}
    </div>
  )
}

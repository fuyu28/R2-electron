import { useState } from 'react'

function App(): React.JSX.Element {
  const [localFolderPath, setLocalFolderPath] = useState<string | null>(null)
  const [R2DestinationPath, setR2DestinationPath] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleOpen = async (): Promise<void> => {
    // フォルダ選択
    const selected = await window.api.fileDialog.selectFolder()
    setLocalFolderPath(selected)

    if (selected !== null) {
      const parts = selected
        .replace(/[\\/]+$/, '')
        .split(/[\\/]+/)
        .filter(Boolean)
      const defaultName = parts.length >= 2 ? parts[parts.length - 2] : ''
      setR2DestinationPath(defaultName)
    }
  }

  const handleUpload = async (): Promise<void> => {
    // 前回の状態クリア
    setError(null)
    setSuccess(null)
    if (localFolderPath !== null && R2DestinationPath !== null) {
      setLoading(true)
      try {
        // アップロード実行
        console.log(localFolderPath)
        const result = await window.api.upload.uploadFolder(localFolderPath, R2DestinationPath)
        if (result.success) {
          setSuccess('アップロードが完了しました🎉')
        } else {
          setError('アップロードに失敗しました😢')
        }
      } catch (e) {
        console.error(e)
        setError('予期せぬエラーが発生しました')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleUploadPathChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    if (value === '') setR2DestinationPath(null)
    else setR2DestinationPath(value)
  }

  return (
    <div className="p-6 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">File Upload Test</h1>
      <button
        onClick={handleOpen}
        disabled={loading}
        className={`
          btn  w-full mb-4
          ${loading ? 'btn-disabled' : 'btn-primary'}
        `}
      >
        {loading ? 'Opening…' : 'File Open'}
      </button>
      <input
        type="text"
        value={R2DestinationPath ?? ''}
        onChange={handleUploadPathChange}
        placeholder="アップロード先パスを入力"
        className="input input-bordered w-full mb-2"
      />
      <p>選択されたアップロード先パス : {R2DestinationPath}</p>
      <button
        onClick={handleUpload}
        disabled={R2DestinationPath === null}
        className={`btn w-full mb-4 ${R2DestinationPath === null || loading ? 'btn-disable' : 'btn-primary'}`}
      >
        {loading ? 'Uploading…' : 'Upload'}
      </button>
      {localFolderPath && (
        <p className="mt-4 text-sm text-gray-700">
          <span className="font-semibold">選択されたパス:</span> {localFolderPath}
        </p>
      )}
      {error && <p className="mt-2 text-error">❌ {error}</p>}
      {success && <p className="mt-2 text-success">✅ {success}</p>}
    </div>
  )
}

export default App

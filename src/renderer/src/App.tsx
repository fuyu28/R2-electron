import { useState } from 'react'

function App(): React.JSX.Element {
  const [path, setPath] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleOpen = async (): Promise<void> => {
    // 前回の状態クリア
    setError(null)
    setSuccess(null)

    // フォルダ選択
    const selected = await window.api.fileDialog.selectFolder()
    if (!selected) {
      // キャンセルされた場合は何もしない
      return
    }

    setPath(selected)
    setLoading(true)
    try {
      // アップロード実行
      const result = await window.api.upload.uploadFolder(selected)
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

  return (
    <div className="p-6 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">File Upload Test</h1>

      <button
        onClick={handleOpen}
        disabled={loading}
        className={`
          w-full py-2 rounded-lg text-white font-medium
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
        `}
      >
        {loading ? 'Uploading…' : 'Open & Upload'}
      </button>

      {path && (
        <p className="mt-4 text-sm text-gray-700">
          <span className="font-semibold">選択されたパス:</span> {path}
        </p>
      )}

      {error && <p className="mt-2 text-red-500">❌ {error}</p>}

      {success && <p className="mt-2 text-green-500">✅ {success}</p>}
    </div>
  )
}

export default App

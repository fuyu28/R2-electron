import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

function renderTree(
  folders: string[],
  level: number,
  onSelect: (path: string) => void,
  selected: string | null
): ReactNode {
  return folders.map((folderName) => {
    const isSelected = selected === folderName
    return (
      <button
        key={`${folderName}-${level}`}
        onClick={() => onSelect(folderName)}
        style={{ paddingLeft: level * 16 }}
        className={`w-full text-left flex items-center space-x-2
          hover:bg-gray-100
          ${isSelected ? 'bg-blue-100' : ''}
        `}
      >
        <span>📁</span>
        <span>{folderName}</span>
      </button>
    )
  })
}

export default function DownloadPage(): React.JSX.Element {
  const [folders, setFolders] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ここで選択されたパスを保持
  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const list = await window.api.getR2FolderList.getR2FolderList()
        if (list !== null) setFolders(list)
      } catch (e) {
        console.error(e)
        setError('ディレクトリ構造の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // ダウンロード実行ハンドラ
  const handleDownload = async (): Promise<void> => {
    if (!selectedPath) return
    setLoading(true)
    try {
      // await window.api.download.downloadFolder(selectedPath)
      // 成功メッセージなど
    } catch (e) {
      console.error(e)
      setError('ダウンロードに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto font-sans space-y-4">
      <h1 className="text-2xl font-bold text-center">Download (R2 Directory)</h1>

      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-error text-center">❌ {error}</p>}

      {!loading && !error && (
        <div className="space-y-1">{renderTree(folders, 0, setSelectedPath, selectedPath)}</div>
      )}

      {/* 選択中のパスを表示 */}
      {selectedPath && (
        <p className="mt-2 text-sm">
          選択中: <strong>{selectedPath}</strong>
        </p>
      )}

      <button
        // onClick={handleDownload}
        disabled={!selectedPath || loading}
        className={`btn w-full ${!selectedPath || loading ? 'btn-disabled' : 'btn-primary'}`}
      >
        {loading ? 'Downloading…' : 'Download'}
      </button>
    </div>
  )
}

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
  const [success, setSuccess] = useState<string | null>(null)

  // R2 側で選択するフォルダ
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  // ローカルに保存する先フォルダ
  const [localFolderPath, setLocalFolderPath] = useState<string | null>(null)

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

  // ローカル保存先を選択
  const handleLocalOpen = async (): Promise<void> => {
    const selected = await window.api.fileDialog.selectFolder()
    if (selected) {
      // 末尾スラッシュ除去
      const trimmed = selected.replace(/[\\/]+$/, '')
      setLocalFolderPath(trimmed)
    }
  }

  // ダウンロード実行
  const handleDownload = async (): Promise<void> => {
    if (!selectedPath || !localFolderPath) return
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await window.api.download.downloadFolder(localFolderPath, selectedPath)
      setSuccess('ダウンロードが完了しました🎉')
    } catch (e) {
      console.error(e)
      setError('ダウンロードに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto font-sans space-y-4 p-4">
      <h1 className="text-2xl font-bold text-center">Download (R2 Directory)</h1>

      {loading && <p className="text-center">Loading…</p>}

      {/* R2側フォルダ選択リスト */}
      {!loading && !error && (
        <div className="space-y-1">{renderTree(folders, 0, setSelectedPath, selectedPath)}</div>
      )}

      {/* 選択中の R2 フォルダ */}
      {selectedPath && (
        <p className="text-sm">
          選択中 (R2): <strong>{selectedPath}</strong>
        </p>
      )}

      {/* ローカル保存先選択ボタン */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">ローカル保存先フォルダを選択</span>
        </label>
        <button
          onClick={handleLocalOpen}
          disabled={loading}
          className={`btn w-full ${loading ? 'btn-disabled' : 'btn-secondary'}`}
        >
          {localFolderPath ? '変更…' : 'フォルダを選択'}
        </button>
      </div>

      {/* 選択されたローカルパス表示 */}
      {localFolderPath && (
        <p className="text-sm whitespace-pre-wrap">
          保存先: <strong>{localFolderPath}</strong>
        </p>
      )}

      {/* ダウンロード実行ボタン */}
      <button
        onClick={handleDownload}
        disabled={!selectedPath || !localFolderPath || loading}
        className={`btn w-full ${
          !selectedPath || !localFolderPath || loading ? 'btn-disabled' : 'btn-primary'
        }`}
      >
        {loading ? 'Downloading…' : 'Download'}
      </button>
      {/* ステータスメッセージ */}
      {error && <p className="text-error text-center">❌ {error}</p>}
      {success && <p className="text-success text-center">✅ {success}</p>}
    </div>
  )
}

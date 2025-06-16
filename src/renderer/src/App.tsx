import { useState } from 'react'

function App(): React.JSX.Element {
  const [path, setPath] = useState<string[]>([])

  const handleOpen = async (): Promise<void> => {
    const result = await window.api.fileDialog.openFile()
    setPath(result)
  }

  return (
    <>
      <h1>File Open Test</h1>
      <button onClick={handleOpen}>Open</button>
      <ul className="list-disc pl-5">
        {path.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </>
  )
}

export default App

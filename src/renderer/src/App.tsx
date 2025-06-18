import { NavLink, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import DownloadPage from './pages/DownloadPage'

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-base-100">
      <nav className="p-4 bg-base-200 flex space-x-4">
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'}`
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/download"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'}`
          }
        >
          Download
        </NavLink>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

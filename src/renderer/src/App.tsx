import { NavLink, Routes, Route } from 'react-router-dom'
import StatusPage from './pages/StatusPage'
import UploadPage from './pages/UploadPage'
import DownloadPage from './pages/DownloadPage'
import SettingsPage from './pages/SettingsPage'
import { useCredentials } from './context/CredentialsContext'

function App(): React.JSX.Element {
  const { hasValidCreds } = useCredentials()

  return (
    <div className="min-h-screen bg-base-100">
      <nav className="p-4 bg-base-200 flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'} ${!hasValidCreds ? 'opacity-50 pointer-events-none' : ''}`
          }
        >
          Upload
        </NavLink>
        <NavLink
          to="/download"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'}  ${!hasValidCreds ? 'opacity-50 pointer-events-none' : ''}`
          }
        >
          Download
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${isActive ? 'btn btn-primary' : 'btn btn-ghost'}`
          }
        >
          Settings
        </NavLink>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<StatusPage />} />
          {hasValidCreds && <Route path="/upload" element={<UploadPage />} />}
          {hasValidCreds && <Route path="/download" element={<DownloadPage />} />}
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

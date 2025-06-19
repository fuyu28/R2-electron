import { ipcRenderer } from 'electron'
import type { Creds } from '../../types/creds'

export const credentialAPI = {
  setCredential: (creds: Creds): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('set-credential', creds),
  getCredential: (): Promise<Creds | null> => ipcRenderer.invoke('get-credential')
}

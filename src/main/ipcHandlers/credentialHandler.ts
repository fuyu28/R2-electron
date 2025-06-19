import { ipcMain } from 'electron'
import type { Creds } from '../../types/creds'
import { getCredential, setCredential } from '../service/credentialService'

export function registerCredentialHandler(): void {
  ipcMain.handle('set-credential', async (_event, creds: Creds): Promise<{ success: boolean }> => {
    const res = await setCredential(creds)
    return res
  })

  ipcMain.handle('get-credential', async (): Promise<Creds | null> => {
    const res = await getCredential()
    return res
  })
}

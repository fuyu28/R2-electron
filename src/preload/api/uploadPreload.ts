import { ipcRenderer } from 'electron'

export const uploadAPI = {
  uploadFolder: (folderPath: string): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('upload-folder', folderPath)
}

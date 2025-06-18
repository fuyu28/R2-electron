import { ipcRenderer } from 'electron'

export const uploadAPI = {
  uploadFolder: (
    localFolderPath: string,
    R2DestinationPath: string
  ): Promise<{ success: boolean }> =>
    ipcRenderer.invoke('upload-folder', localFolderPath, R2DestinationPath)
}

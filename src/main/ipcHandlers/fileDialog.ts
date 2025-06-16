import { ipcMain, dialog } from 'electron'

export function registerFileDialogHandler(): void {
  ipcMain.handle('open-file-dialog', async (): Promise<string[]> => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    })
    if (canceled) return []
    return filePaths
  })
}

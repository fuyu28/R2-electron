import { registerDownloadHandlers } from './ipcHandlers/downloadHandler'
import { registerFileDialogHandler } from './ipcHandlers/fileDialogHandlers'
import { getR2FolderListHandler } from './ipcHandlers/getR2FolderListHandler'
import { registerUploadHandlers } from './ipcHandlers/uploadHandlers'

export function registerAllHandlers(): void {
  registerFileDialogHandler()
  registerUploadHandlers()
  registerDownloadHandlers()
  getR2FolderListHandler()
}

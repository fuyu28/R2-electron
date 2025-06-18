import { registerFileDialogHandler } from './ipcHandlers/fileDialogHandlers'
import { getR2FolderListHandler } from './ipcHandlers/getR2FolderListHandler'
import { registerUploadHandlers } from './ipcHandlers/uploadHandlers'

export function registerAllHandlers(): void {
  registerFileDialogHandler()
  registerUploadHandlers()
  getR2FolderListHandler()
}

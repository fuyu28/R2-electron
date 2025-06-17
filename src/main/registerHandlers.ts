import { registerFileDialogHandler } from './ipcHandlers/fileDialogHandlers'
import { registerUploadHandlers } from './ipcHandlers/uploadHandlers'

export function registerAllHandlers(): void {
  registerFileDialogHandler()
  registerUploadHandlers()
}

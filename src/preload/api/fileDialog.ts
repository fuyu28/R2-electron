import { ipcRenderer } from 'electron'

export const fileDialogAPI = {
  openFile: () => ipcRenderer.invoke('open-file-dialog')
}

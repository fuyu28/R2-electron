export interface FileDialogAPI {
  openFile(): Promise<string[]>
}

export interface API {
  fileDialog: FileDialogAPI
}

declare global {
  interface Window {
    api: API
  }
}

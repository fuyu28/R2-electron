export interface FileDialogAPI {
  openFile(): Promise<string[]>
}

export interface API {
  fileDialog: FileDialogAPI
}

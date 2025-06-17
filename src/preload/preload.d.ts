export interface FileDialogAPI {
  selectExe(): Promise<string | null>
  selectFolder(): Promise<string | null>
}

export interface UploadAPI {
  uploadFolder(folderPath: string): Promise<{ success: boolean }>
}

export interface API {
  fileDialog: FileDialogAPI
  upload: UploadAPI
}

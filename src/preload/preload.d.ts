export interface FileDialogAPI {
  selectExe(): Promise<string | null>
  selectFolder(): Promise<string | null>
}

export interface UploadAPI {
  uploadFolder(localFolderPath: string, r2DestinationPath: string): Promise<{ success: boolean }>
}

export interface GetR2ListAPI {
  getR2FolderList(): Promise<string[] | null>
}

export interface DownloadAPI {
  downloadFolder(localFolderPath: string, r2DestinationPath: string): Promise<{ success: boolean }>
}

export interface API {
  fileDialog: FileDialogAPI
  upload: UploadAPI
  getR2FolderList: GetR2ListAPI
  download: DownloadAPI
}

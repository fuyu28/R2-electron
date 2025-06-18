export interface FileDialogAPI {
  selectExe(): Promise<string | null>
  selectFolder(): Promise<string | null>
}

export interface UploadAPI {
  uploadFolder(localFolderPath: string, R2DestinationPath: string): Promise<{ success: boolean }>
}

export interface EnvAPI {
  getEnv(envName: string): Promise<string | null>
}

export interface API {
  fileDialog: FileDialogAPI
  upload: UploadAPI
  env: EnvAPI
}

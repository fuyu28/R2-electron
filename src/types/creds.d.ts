export interface Schema {
  bucketName: string
  region: string
  endpoint: string
  accessKeyId: string
}

export interface Creds extends Schema {
  secretAccessKey: string
}

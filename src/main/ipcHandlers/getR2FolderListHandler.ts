import { ipcMain } from 'electron'
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { r2Client } from '../r2Client'

export function getR2FolderListHandler(): void {
  ipcMain.handle('get-r2-folder-list', async (): Promise<string[] | null> => {
    const cmd = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
      Delimiter: '/'
    })
    const res = await r2Client.send(cmd)
    const dirs = res.CommonPrefixes?.map((cp) => cp.Prefix!.replace(/[\\/]+$/, '')) ?? null
    return dirs
  })
}

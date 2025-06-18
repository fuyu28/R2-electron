import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { ipcMain } from 'electron'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2Client } from '../r2Client'

export function registerUploadHandlers(): void {
  ipcMain.handle(
    'upload-folder',
    async (
      _event,
      localFolderPath: string,
      r2DestinationPath: string
    ): Promise<{ success: boolean }> => {
      try {
        const files = await readdir(localFolderPath)
        for (const file of files) {
          const fullPath = join(localFolderPath, file)
          const fileBody = await readFile(fullPath)

          const cmd = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `${r2DestinationPath}/${file}`,
            Body: fileBody
          })
          await r2Client.send(cmd)
        }
        return { success: true }
      } catch (err) {
        console.error(err)
        return { success: false }
      }
    }
  )
}

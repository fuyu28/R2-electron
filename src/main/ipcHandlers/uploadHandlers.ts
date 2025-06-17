import 'dotenv/config'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { ipcMain } from 'electron'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { R2Client } from '../R2Client'

export function registerUploadHandlers(): void {
  ipcMain.handle(
    'upload-folder',
    async (_event, folderPath: string): Promise<{ success: boolean }> => {
      try {
        const files = await readdir(folderPath)
        for (const file of files) {
          const fullPath = join(folderPath, file)
          const fileBody = await readFile(fullPath)

          const cmd = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: `uploads/${file}`,
            Body: fileBody
          })
          await R2Client.send(cmd)
        }
        return { success: true }
      } catch (err) {
        console.error(err)
        return { success: false }
      }
    }
  )
}

import { Injectable, NotImplementedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { rmSync, writeFileSync } from 'fs';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { extname } from 'path';

@Injectable()
export class AppService {

  checkUnicode(files: FileSystemStoredFile[]): FileSystemStoredFile[] {
    let attachments = files
    attachments.forEach(file => {
      if (!/[^\u0000-\u00ff]/.test(file?.originalName)) {
        const name = Buffer.from(file.originalName, 'latin1').toString('utf8')
        file.originalName = name
      }
    })
    // console.log(attachments);
    return attachments
  }

  renameFile(originalName: string) {
    const fileExtension = extname(originalName);
    // const fileName = basename(originalName, fileExtension);
    const newFileName = `${randomUUID()}${fileExtension}`;
    return newFileName
  }

  getPath(dirName: 'images' | 'attachments' | 'measurements', fileName: string) {
    const imagesDir: string = process.env.IMAGES_DIR
    const attachmentsDir: string = process.env.ATTACHMENTS_DIR
    const measurementsDir: string = process.env.MEASUREMENTS_DIR
    let path = null
    switch (dirName) {
      case 'images':
        path = `${imagesDir}/${fileName}`
        break;
      case 'attachments':
        path = `${attachmentsDir}/${fileName}`
        break;
      case 'measurements':
        path = `${measurementsDir}/${fileName}`
        break;
      default:
        break;
    }
    return path
  }

  deleteFile(dirName: 'images' | 'attachments' | 'measurements', fileName: string) {
    // let path = file.mimeType.includes('image') ? `${imagesDir}/${file.name}` : `${attachmentsDir}/${file.name}`
    let path = this.getPath(dirName, fileName)
    try {
      rmSync(path, { force: true })
      // file['deleted'] = true
    } catch (error) {
      throw new NotImplementedException(`can not remove file path "${path}"`)
    }
  }

  saveFile(file: FileSystemStoredFile, dirName: 'images' | 'attachments' | 'measurements') {
    try {
      const newFileName = this.renameFile(file.originalName)
      let path = this.getPath(dirName, newFileName)
      if (path) {
        writeFileSync(path, file['buffer'])
        file.originalName = newFileName
      }
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }
}

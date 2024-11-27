import { Injectable } from '@nestjs/common';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World! naja eiei';
  }

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
}

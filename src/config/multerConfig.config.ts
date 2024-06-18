import { HttpException, HttpStatus } from "@nestjs/common";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

// Multer configuration
export const multerConfig = {
  // dest: process.env.UPLOAD_LOCATION,
  dest: './uploads',
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 100000,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    console.log(file.mimetype);
    
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomUUID()}${extname(file.originalname)}`);
    },
  }),
};
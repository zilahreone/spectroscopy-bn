import { BadRequestException, Injectable, NotFoundException, NotImplementedException, StreamableFile } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment, Files } from './entities/experiment.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile, MemoryStoredFile } from 'nestjs-form-data';
import { createReadStream, existsSync, mkdirSync, readdirSync, renameSync, rmSync, rmdirSync, statSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';
import path, { basename, extname, join } from 'path';
import { AuthService } from 'src/auth/auth.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
    private readonly authService: AuthService
  ) { }

  removeFile(path: string) {
    try {
      rmSync(path, { force: true })
    } catch (error) {
      console.error(error);
      throw new NotImplementedException(`cannot remove file path "${path}"`)
    }
  }

  // removeDir(path: string) {
  //   const pathArr = path.split(/\//g)
  //   console.log(pathArr);

  //   path.split(/\//g).forEach((p, index) => {
  //     pathArr.pop()
  //     if (pathArr.length > 0) {
  //       const pathDir = pathArr.join('/')
  //       console.log(pathDir);

  //       if (statSync(pathDir).isDirectory()) {
  //         if (readdirSync(pathDir).length === 0) {
  //           try {
  //               rmdirSync(pathDir)
  //             } catch (error) {
  //               console.error(error);
  //             }
  //         }
  //       }
  //     }
  //   });
  // }

  removeDir(path: string) {
    if (statSync(path).isDirectory()) {
      if (readdirSync(path).length === 0) {
        try {
          rmdirSync(path)
        } catch (error) {
          throw new NotImplementedException(`cannot remove directory "${path}"`)
        }
      }
    }
  }

  renameFile(originalName: string) {
    const fileExtension = extname(originalName);
    // console.log(fileExtension);

    const fileName = basename(originalName, fileExtension);
    // console.log(fileName);

    const newFileName = `${fileName}-${randomUUID()}${fileExtension}`;
    return newFileName
  }

  renameDir(currentPath: string, path: string) {
    const currentPathDir = `./${process.env.UPLOAD_DIR}/${currentPath}`
    const pathDir = `./${process.env.UPLOAD_DIR}/${path}`
    // console.log(existsSync(pathDir));
    if (currentPathDir !== pathDir) {
      !existsSync(pathDir) && mkdirSync(pathDir)
      const currentFileArr = readdirSync(currentPathDir);
      const fileArr = readdirSync(pathDir);
      // const filteredArray = currentFileArr.filter(value => fileArr.includes(value));
      currentFileArr.forEach(filename => {
        try {
          if (fileArr.includes(filename)) {
            renameSync(`${currentPathDir}/${filename}`, `${pathDir}/${this.renameFile(filename)}`);
          } else {
            renameSync(`${currentPathDir}/${filename}`, `${pathDir}/${filename}`);
          }
        } catch (error) {
          console.error(error)
        }
      });
      console.log(currentPathDir);
      if (readdirSync(currentPathDir).length === 0) this.removeDir(currentPathDir)

    }
  }

  saveFiles(files: MemoryStoredFile[], path: string) {
    if (files && files.length > 0) {
      try {
        files.forEach((file: MemoryStoredFile, index: number) => {
          // console.log(index, file.originalName);
          // const uploadPath = `./${process.env.UPLOAD_DIR ? process.env.UPLOAD_DIR : 'tmp'}`;
          const uploadPath = `./uploads/${path}`;
          const filePath = `${uploadPath}/${file.originalName}`

          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          if (!existsSync(filePath)) {
            writeFileSync(filePath, file.buffer)
          } else {
            const newFileName = this.renameFile(file.originalName)
            writeFileSync(`${uploadPath}/${newFileName}`, file.buffer)
            file.originalName = newFileName
          }
        })
      } catch (error) {
        throw new NotImplementedException(`File Exception`)
      }
    }
  }

  async create(createExperimentDto: CreateExperimentDto) {
    const uuid = randomUUID()
    const files_attachments = createExperimentDto.files as unknown as MemoryStoredFile[]
    const others_attachments = createExperimentDto.others_attachments as unknown as MemoryStoredFile[]

    const pathFiles = `${createExperimentDto.data.created_by.id}/${uuid}`
    const pathAttachments = `${createExperimentDto.data.created_by.id}/attachments`

    // delete createExperimentDto.data.created_by

    createExperimentDto.data = {
      ...createExperimentDto.data,
      chemical_id: uuid,
      files: files_attachments?.map((file: MemoryStoredFile) => (
        {
          name: file.originalName,
          path: `${pathFiles}/${file.originalName}`,
          size: file.size,
          mime_type: file.mimeType,
          file_ext: file.extension
        }
      )),
      others_attachments: others_attachments?.map((file: MemoryStoredFile) => (
        {
          name: file.originalName,
          path: `${pathAttachments}/${file.originalName}`,
          size: file.size,
          mime_type: file.mimeType,
          file_ext: file.extension
        }
      ))
    }
    // console.log(createExperimentDto.data);
    try {
      this.saveFiles(files_attachments, pathFiles)
      this.saveFiles(others_attachments, pathAttachments)
      await this.experimentRepository.save(createExperimentDto.data);
    } catch (error) {
      throw new NotImplementedException(error.driverError.toString())
    }
  }

  async update(id: string, updateExperimentDto: UpdateExperimentDto) {
    const experiments = await this.findOne(id)

    const files = updateExperimentDto['files'] as unknown as MemoryStoredFile[]
    // this.saveFiles(files, pathFiles)
    
    const others_attachments = updateExperimentDto['others_attachments'] as unknown as MemoryStoredFile[]
    this.saveFiles(others_attachments, `${updateExperimentDto.data.created_by.id}/attachments`)

    return this.experimentRepository.save({
      ...experiments,
      ...updateExperimentDto.data
    })
  }

  async findAllWithoutId() {
    try {
      return await this.experimentRepository.find({
        order: {
          chemical_name: 'ASC'
        }
      })
    } catch (error) {
      throw new NotImplementedException(error.driverError.toString())
    }
  }

  async findAll() {
    // console.log('eiei', this.authService.getJWTDecode());
    const jwtDecode = this.authService.getJWTDecode();
    return await this.experimentRepository.find({
      // where: {
      //   id: jwtDecode['sub']
      // },
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: string) {
    const result = await this.experimentRepository.findOneBy({
      id: id,
    });
    if (result) {
      return result
    }
    throw new NotFoundException(`id "${id}" not found`)
  }

  async remove(id: string) {
    const experiment = await this.findOne(id)
    let result: Experiment
    try {
      result = await this.experimentRepository.remove(experiment);
    } catch (error) {
      console.error(error);
    }
    return result
  }

  async findAttachment(param: { id: string, name: string }): Promise<StreamableFile> {
    const { id, name } = param
    const experiment = await this.findOne(id)
    const attachmentObject = experiment.others_attachments.filter(att => att.name === name)[0]
    try {
      const file = createReadStream(join(process.cwd(), `/uploads/${experiment.created_by.id}/attachments/${name}`));
      return new StreamableFile(file, {
        type: attachmentObject.mime_type
      })
    } catch (error) {
      throw new NotImplementedException(error.driverError.toString())
    }
  }

  async findFile(param: { id: string, name: string }): Promise<StreamableFile> {
    const { id, name } = param
    const experiment = await this.findOne(id)
    const fileObject = experiment.files.filter(file => file.name === name)[0]
    try {
      const file = createReadStream(join(process.cwd(), `/uploads/${experiment.created_by.id}/${experiment.chemical_id}/${name}`));
      return new StreamableFile(file, {
        type: fileObject.mime_type
      })
    } catch (error) {
      throw new NotImplementedException(error.driverError.toString())
    }
  }


}

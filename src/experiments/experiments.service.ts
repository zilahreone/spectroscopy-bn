import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateExperimentDto } from './dto/create-experiment.dto';
import { UpdateExperimentDto } from './dto/update-experiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experiment, Files } from './entities/experiment.entity';
import { Repository } from 'typeorm';
import { FileSystemStoredFile, MemoryStoredFile } from 'nestjs-form-data';
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';
import { basename, extname } from 'path';

@Injectable()
export class ExperimentsService {
  constructor(
    @InjectRepository(Experiment)
    private readonly experimentRepository: Repository<Experiment>,
  ) { }

  removeFile(path: string) {
    try {
      rmSync(path, { force: true })
    } catch (error) {
      throw new NotImplementedException(`can not remove file path "${path}"`)
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

  saveFiles(files: MemoryStoredFile[], path: string) {
    try {
      files.forEach((file: MemoryStoredFile, index: number) => {
        // console.log(index, file.originalName);

        // const uploadPath = `./${process.env.UPLOAD_DIR ? process.env.UPLOAD_DIR : 'tmp'}`;
        const uploadPath = `./${process.env.UPLOAD_DIR || 'tmp'}/${path}`;
        const filePath = `${uploadPath}/${file.originalName}`

        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
          // writeFileSync(`${uploadPath}/${file.originalName}`, file.buffer)
        }
        if (!existsSync(filePath)) {
          writeFileSync(filePath, file.buffer)
        } else {
          // const fileNameArr = file.originalName.split(/\./g)
          // fileNameArr.splice(file.originalName.split(/\./g).length - 1, 0, randomUUID())
          // const newFileName = fileNameArr.join('.')
          // file.originalName = newFileName
          // console.log(newFn.join('.'));
          // console.log(file);
          // const fnArr = file.originalName.split(/\./g);
          // fnArr.pop();
          // const ext = file.originalName.split(/\./g).pop()
          // const newFn = `${fnArr}-${new Date().toISOString().split(/\./g).shift()}.${ext}`
          // const newFn = `${fnArr}-${randomUUID()}.${ext}`
          const newFileName = this.renameFile(file.originalName)
          writeFileSync(`${uploadPath}/${newFileName}`, file.buffer)
          file.originalName = newFileName
        }
      })
    } catch (error) {
      throw new NotImplementedException(`File Exception`)
    }
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
    }
  }

  async create(createExperimentDto: CreateExperimentDto) {
    // console.log((createExperimentDto.files[0].path.split(/\//g)).pop());
    // console.log(createExperimentDto.others_attachments);
    // console.log(createExperimentDto.others_attachments);

    const files_attachments = createExperimentDto.files as unknown as MemoryStoredFile[]
    const others_attachments = createExperimentDto.others_attachments as unknown as MemoryStoredFile[]
    const path = `${createExperimentDto.data.experiment_name}/${createExperimentDto.data.chemical_name}`
    // console.log(files);
    this.saveFiles(others_attachments, path)
    createExperimentDto.data = {
      ...createExperimentDto.data,
      created_by: {
        id: 'sdfsdfsdfs-sdfsdf-rsdfgsd',
        name: 'wissarut'
      },
      // files: files_attachments.map((file: MemoryStoredFile) => (
      //   {
      //     file_name: file.originalName,
      //     path: `${process.env.UPLOAD_DIR}/${path}/${file.originalName}`,
      //     size: file.size,
      //     mime_type: file.mimeType,
      //     file_ext: file.extension
      //   }
      // )),
      others_attachments: others_attachments.map((file: MemoryStoredFile) => (
        {
          file_name: file.originalName,
          path: `${process.env.UPLOAD_DIR}/${path}/${file.originalName}`,
          size: file.size,
          mime_type: file.mimeType,
          file_ext: file.extension
        }
      ))
    }
    // console.log(createExperimentDto.data);
    try {
      const result = await this.experimentRepository.save(createExperimentDto.data);
      return result
    } catch (error) {
      // console.error(error);
      // this.removeFile()
      throw new NotImplementedException(error.driverError.toString())
    }
  }

  async findAll() {
    return await this.experimentRepository.find({
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

  async update(id: string, updateExperimentDto: UpdateExperimentDto) {
    const experiments = await this.findOne(id)
    const currentPath = `${experiments.experiment_name}/${experiments.chemical_name}`
    const updatePath = `${updateExperimentDto.data.experiment_name}/${updateExperimentDto.data.chemical_name}`
    this.renameDir(currentPath, updatePath)

    // return this.experimentRepository.save({
    //   ...await this.findOne(id),
    //   ...updateExperimentDto.data
    // })
  }

  async remove(id: string) {
    const experiment = await this.findOne(id)
    const result = await this.experimentRepository.remove(experiment);
    return result
  }
}

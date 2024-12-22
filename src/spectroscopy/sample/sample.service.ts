import { Injectable, NotFoundException, NotImplementedException, StreamableFile } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './entities/sample.entity';
import { ChemicalService } from '../chemical/chemical.service';
import { CategoryService } from '../category/category.service';
import { OrganizationService } from '../organization/organization.service';
import { FormService } from '../form/form.service';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { createReadStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { basename, extname, join } from 'path';
import { randomUUID, sign } from 'crypto';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly repository: Repository<Sample>,
    private readonly chemicalService: ChemicalService,
    private readonly categoryService: CategoryService,
    private readonly organizationService: OrganizationService,
    private readonly formService: FormService,
  ) { }

  renameFile(originalName: string) {
    const fileExtension = extname(originalName);
    // const fileName = basename(originalName, fileExtension);
    const newFileName = `${randomUUID()}${fileExtension}`;
    return newFileName
  }

  deleteFile(file: { name: string, size: number, mimeType: string, fileExt: string }) {
    const imagesDir: string = process.env.IMAGES_DIR
    const attachmentsDir: string = process.env.ATTACHMENTS_DIR
    let path = file.mimeType.includes('image') ? `${imagesDir}/${file.name}` : `${attachmentsDir}/${file.name}`
    try {
      rmSync(path, { force: true })
      file['deleted'] = true
    } catch (error) {
      throw new NotImplementedException(`can not remove file path "${path}"`)
    }
  }

  saveFile(file: FileSystemStoredFile) {
    const imagesDir: string = process.env.IMAGES_DIR
    const attachmentsDir: string = process.env.ATTACHMENTS_DIR
    // const measurementsDir: string = process.env.MEASUREMENTS_DIR
    try {
      const newFileName = this.renameFile(file.originalName)
      let path = file.mimeType.includes('image') ? `${imagesDir}/${newFileName}` : `${attachmentsDir}/${newFileName}`
      writeFileSync(path, file['buffer'])
      file.originalName = newFileName
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async create(createSampleDto: CreateSampleDto) {
    // console.log(createSampleDto);
    const chemical = await this.chemicalService.findOne({ id: createSampleDto.data.chemicalId })
    const category = await this.categoryService.findOne({ id: createSampleDto.data.categoryId })
    const organization = await this.organizationService.findOne({ id: createSampleDto.data.organizationId })
    const form = await this.formService.findOne({ id: createSampleDto.data.formId })
    try {
      const imagesDto = createSampleDto.images as unknown as FileSystemStoredFile[] || []
      const attachmentsDto = createSampleDto.attachments as unknown as FileSystemStoredFile[] || []
      
      // SAVE FILES
      imagesDto?.forEach((image, index) => {
        const originalName = image.originalName
        this.saveFile(image)
        createSampleDto.data.images.splice(
          createSampleDto.data.images.findIndex(dataImage => dataImage.name === originalName), 1,
          { name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension }
        )
      })
      attachmentsDto?.forEach((attach, index) => {
        const originalName = attach.originalName
        this.saveFile(attach)
        createSampleDto.data.attachments.splice(
          createSampleDto.data.attachments.findIndex(dataAttach => dataAttach.name === originalName), 1,
          { name: attach.originalName, size: attach.size, mimeType: attach.mimeType, fileExt: attach.extension }
        )
      })
      return await this.repository.save({ ...createSampleDto.data, chemical: chemical, category: category, organization: organization, form: form })
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { chemical: true, form: true, category: true, organization: true } })
  }

  async findOne(id: { name: string } | { id: string }) {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { chemical: true, form: true, category: true, organization: true } })
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: { name: string } | { id: string }, updateSampleDto: UpdateSampleDto) {
    let find = await this.findOne(id);
    const chemical = await this.chemicalService.findOne({ id: updateSampleDto.data.chemicalId })
    const category = await this.categoryService.findOne({ id: updateSampleDto.data.categoryId })
    const organization = await this.organizationService.findOne({ id: updateSampleDto.data.organizationId })
    const form = await this.formService.findOne({ id: updateSampleDto.data.formId })
    try {
      const imagesDto = updateSampleDto.images as unknown as FileSystemStoredFile[] || []
      const attachmentsDto = updateSampleDto.attachments as unknown as FileSystemStoredFile[] || []

      // console.log(updateSampleDto.data.images);

      // COMPARE FILE NAME AND DELETE FILES
      find.images.forEach((image, index) => {
        if (updateSampleDto.data.images.findIndex(updateImage => updateImage.name === image.name) < 0) {
          this.deleteFile(image)
        }
      })
      find.attachments.forEach((attach, index) => {
        if (updateSampleDto.data.attachments.findIndex(updateImage => updateImage.name === attach.name) < 0) {
          this.deleteFile(attach)
        }
      })

      // SAVE FILES
      imagesDto?.forEach((image, index) => {
        const originalName = image.originalName
        this.saveFile(image)
        updateSampleDto.data.images.splice(
          updateSampleDto.data.images.findIndex(dataImage => dataImage.name === originalName), 1,
          { name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension }
        )
      })
      attachmentsDto?.forEach((attach, index) => {
        const originalName = attach.originalName
        this.saveFile(attach)
        updateSampleDto.data.attachments.splice(
          updateSampleDto.data.attachments.findIndex(dataAttach => dataAttach.name === originalName), 1,
          { name: attach.originalName, size: attach.size, mimeType: attach.mimeType, fileExt: attach.extension }
        )
      })

      const update = Object.keys(find).reduce((prev, curr) => {
        if (!['createAt', 'updateAt', 'chemical', 'category', 'organization', 'form'].includes(curr)) {
          prev[curr] = updateSampleDto.data[curr]
        }
        return prev
      }, {
        chemical,
        category,
        organization,
        form
      })

      // console.log(update);

      return await this.repository.update(id, update)
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: { name: string } | { id: string }) {
    await this.findOne(id);
    try {
      return await this.repository.delete(id)
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async streamFile(id: { name: string } | { id: string }, filename: string) {
    const imagesDir: string = process.env.IMAGES_DIR
    const attachmentsDir: string = process.env.ATTACHMENTS_DIR

    const find = await this.findOne(id)
    const filter = find.images.concat(find.attachments).filter(file => file.name === filename)[0]
    console.log((filter));
    // return find
    const file = createReadStream(join(process.cwd(), `${filter.mimeType.includes('image') ? imagesDir : attachmentsDir}/${filename}`));
    return new StreamableFile(file, {
      type: filter.mimeType,
      // disposition: 'attachment; filename="package.json"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    })
  }
}

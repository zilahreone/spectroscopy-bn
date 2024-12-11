import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
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
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { basename, extname } from 'path';
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
      return await this.repository.save({ ...createSampleDto.data, chemical: chemical, category: category, organization: organization, form: form })
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { experiments: true, chemical: true, form: true, category: true, organization: true } })
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

      // console.log(find);

      // SAVE FILES
      imagesDto?.forEach((image, index) => {
        this.saveFile(image)
      })

      // COMPARE FILE NAME AND DELETE FILES
      find.images.forEach((image, index) => {
        if (updateSampleDto.data.images.findIndex(updateImage => updateImage.name === image.name) < 0) {
          this.deleteFile(image)
        }
      })

      const images = imagesDto.length > 0
        ? [...find.images, ...imagesDto?.map((image) => ({ name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension }))]
        : find.images.filter(image => !image['deleted'])

      // const images = () => {
      //   let images = imagesDto?.map((image) => ({ name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension }))
      //   images.concat(find.images.filter(image => !image['deleted']))
      //   return images
      // }

      // console.log(images());
      
      // imagesDto?.map((image) => ({ name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension })).concat(find.images)
      // const attachments = attachmentsDto?.map((image) => ({ name: image.originalName, size: image.size, mimeType: image.mimeType, fileExt: image.extension }))

      const update = Object.keys(find).reduce((prev, curr) => {
        if (!['images', 'attachments', 'createAt', 'updateAt', 'chemical', 'category', 'organization', 'form'].includes(curr)) {
          prev[curr] = updateSampleDto.data[curr]
        }
        return prev
      }, {
        images,
        // attachments,
        chemical,
        category,
        organization,
        form
      })

      console.log(update);

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
}

import { Injectable, NotFoundException, NotImplementedException, StreamableFile } from '@nestjs/common';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ExperimentService } from '../experiment/experiment.service';
import { AppService } from 'src/app.service';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly repository: Repository<Measurement>,
    private readonly experimentService: ExperimentService,
    private readonly appService: AppService,
  ) { }
  async create(createMeasurementDto: CreateMeasurementDto) {
    const experiment = await this.experimentService.findOne({ id: createMeasurementDto.data.experimentId })
    const attachment: FileSystemStoredFile = createMeasurementDto.attachment[0]
    try {
      this.appService.saveFile(attachment)
      createMeasurementDto.data.attachment = {
        name: attachment.originalName, size: attachment.size, mimeType: attachment.mimeType, fileExt: attachment.extension
      }
      // console.log(createMeasurementDto.data);
      return await this.repository.save({ ...createMeasurementDto.data, experiment })
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { experiment: {technique: true } } })
  }

  async findOne(id: { name: string } | { id: string }): Promise<Measurement> {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { experiment: { technique: true} } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: { name: string } | { id: string }, updateMeasurementDto: UpdateMeasurementDto) {
    await this.findOne(id);
    const experiment = await this.experimentService.findOne({ id: updateMeasurementDto.data.experimentId })
    try {
      return await this.repository.update(id, { ...updateMeasurementDto.data, experiment });
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

  findFile(id: { name: string } | { id: string }, name: string) {
    const measurement: Promise<Measurement> = this.findOne(id)
    const file = createReadStream(join(process.cwd(), `/uploads/${id}/measurements/${name}`));
    return new StreamableFile(file, {
      type: 'application/json',
      // disposition: 'attachment; filename="package.json"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    })
  }

  async streamFile(id: { name: string } | { id: string }, filename: string) {
    const imagesDir: string = process.env.IMAGES_DIR
    const attachmentsDir: string = process.env.ATTACHMENTS_DIR

    const find = await this.findOne(id)
    // const filter = find.images.concat(find.attachments).filter(file => file.name === filename)[0]
    // console.log((filter));
    const file = createReadStream(join(process.cwd(), `${find.attachment.mimeType.includes('image') ? imagesDir : attachmentsDir}/${filename}`));
    return new StreamableFile(file, {
      type: find.attachment.mimeType,
      // disposition: 'attachment; filename="package.json"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    })
  }
}

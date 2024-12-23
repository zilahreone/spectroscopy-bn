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
import { Experiment } from '../experiment/entities/experiment.entity';

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(Measurement)
    private readonly repository: Repository<Measurement>,
    private readonly experimentService: ExperimentService,
    private readonly appService: AppService,
  ) { }

  measurementObject(experiment: Experiment, measurementDto: CreateMeasurementDto | UpdateMeasurementDto) {
    let measurement = {
      name: measurementDto.data.name,
      spectrumDescription: measurementDto.data.spectrumDescription,
      remark: measurementDto.data.remark,
      experiment: experiment,
      attachment: measurementDto.data.attachment,
      raman: null,
    }
    switch (measurementDto.data.techniqueName) {
      case 'raman':
        measurement = {
          ...measurement,
          raman: measurementDto.data.signal
        }
        break;
      default:
        break;
    }
    return measurement
  }

  async create(createMeasurementDto: CreateMeasurementDto) {
    const experiment = await this.experimentService.findOne({ id: createMeasurementDto.data.experimentId })
    const attachment: FileSystemStoredFile = createMeasurementDto.attachment[0]
    // console.log(createMeasurementDto.data);
    try {
      this.appService.saveFile(attachment, 'measurements')
      createMeasurementDto.data.attachment = {
        name: attachment.originalName, size: attachment.size, mimeType: attachment.mimeType, fileExt: attachment.extension
      }
      const measurement = this.measurementObject(experiment, createMeasurementDto)
      return await this.repository.save(measurement)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { experiment: { technique: true } } })
  }

  async findOne(id: { name: string } | { id: string }): Promise<Measurement> {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { experiment: { technique: true, instrument: true } } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: { name: string } | { id: string }, updateMeasurementDto: UpdateMeasurementDto) {
    const find = await this.findOne(id);
    const experiment = await this.experimentService.findOne({ id: updateMeasurementDto.data.experimentId })
    const attachment: FileSystemStoredFile = updateMeasurementDto.attachment[0]
    // console.log(updateMeasurementDto.data.attachment);
    // console.log(find.attachment);
    // console.log(attachment);
    
    try {
      if (find.attachment.name !== updateMeasurementDto.data.attachment.name && find.attachment.size !== updateMeasurementDto.data.attachment.size) {
        this.appService.saveFile(attachment, 'measurements')
        updateMeasurementDto.data.attachment = {
          name: attachment.originalName, size: attachment.size, mimeType: attachment.mimeType, fileExt: attachment.extension
        }
        this.appService.deleteFile('measurements', find.attachment.name)
      }
      const measurement = this.measurementObject(experiment, updateMeasurementDto)
      // console.log(measurement);
      return await this.repository.update(id, measurement);
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
    const find = await this.findOne(id)
    // const filter = find.images.concat(find.attachments).filter(file => file.name === filename)[0]
    // console.log((filter));
    const path = this.appService.getPath('measurements', filename)
    const file = createReadStream(join(process.cwd(), path));
    return new StreamableFile(file, {
      type: find.attachment.mimeType,
      // disposition: 'attachment; filename="package.json"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    })
  }
}

import { Injectable, NotFoundException, NotImplementedException, StreamableFile, InternalServerErrorException } from '@nestjs/common';
import { CreateDownloadDto } from './dto/create-download.dto';
import { UpdateDownloadDto } from './dto/update-download.dto';
import { Download } from './entities/download.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasurementService } from '../measurement/measurement.service';
import { UserService } from '../user/user.service';
import { ExperimentService } from '../experiment/experiment.service';
import { createReadStream, createWriteStream, ReadStream } from 'fs';
import { join } from 'path';
import * as archiver from 'archiver';
import * as temp from 'temp'
import { Experiment } from '../experiment/entities/experiment.entity';
// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class DownloadService {
  constructor(
    @InjectRepository(Download)
    private readonly repository: Repository<Download>,
    private readonly experimentService: ExperimentService,
    private readonly userService: UserService,
  ) { }
  async create(createDownloadDto: CreateDownloadDto) {
    const experiment = await this.experimentService.findOne({ id: createDownloadDto.experimentId });
    const user = await this.userService.findOne(createDownloadDto.userId);

    return await this.repository.save({ ...createDownloadDto, experiment, user })
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneOrFail({ where: { id }, relations: { experiment: true, user: true } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateDownloadDto: UpdateDownloadDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateDownloadDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async findExperiment(experimentId: string) {
    const experiment = await this.experimentService.findOne({ id: experimentId });
    return this.streamZip(experiment)
  }

  streamAsPromise(originalName: string): Promise<ReadStream> {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(join(process.cwd(), `${process.env.MEASUREMENTS_DIR}/${originalName}`))
      // let data = null
      readStream.on("data", (chunk) => {
        // console.log(chunk.toString());
        // console.log('---------------');
        // data = data += chunk
      })
      readStream.on("end", () => {
        resolve(readStream)
        // console.log('end');
        readStream.close()
      })
      readStream.on("error", (error) => {
        reject(error)
      })
    })
  }

  async streamZip(experiment: Experiment): Promise<StreamableFile> {
    // const experiment = await this.experimentService.findOne({ id: experimentId });
    const files = experiment.measurements.map(measurement => ({
      name: `${experiment.technique.name.toUpperCase()}-${JSON.stringify(measurement[experiment.technique.name])?.replaceAll(/\"/g, '').replaceAll(/\:/g, '=')}.${measurement.attachment.fileExt}`,
      originalName: measurement.attachment.name
    }))
    temp.track();
    const stream = temp.createWriteStream();
    // const stream = createWriteStream(join(process.cwd(), 'test.zip'))
    // console.log(stream.path);
    const archive = archiver('zip', {
      zlib: { level: 0 } // Sets the compression level.
    });
    archive.pipe(stream);
    // stream.end();
    for (const { name, originalName } of files) {
      await this.streamAsPromise(originalName).then((readFile) => {
        archive.append(readFile, { name })
      }).catch((error) => {
        // console.log(error.message);
        throw new InternalServerErrorException(`read file "${originalName}" error !!!`)
      })
    }
    // console.log('out for loop!!');
    archive.finalize();
    const zip = createReadStream(stream.path);
    return new StreamableFile(zip, {
      // type: 'application/json',
      disposition: `attachment; filename="${experiment.name}.zip"`,
    })
  }
}

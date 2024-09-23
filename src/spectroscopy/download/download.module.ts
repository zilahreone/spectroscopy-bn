import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Download } from './entities/download.entity';
import { MeasurementService } from '../measurement/measurement.service';
import { MeasurementModule } from '../measurement/measurement.module';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService],
  imports: [
    TypeOrmModule.forFeature([Download]),
    MeasurementModule
  ]
})
export class DownloadModule {}

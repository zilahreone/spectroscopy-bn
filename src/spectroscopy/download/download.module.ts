import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Download } from './entities/download.entity';
import { MeasurementModule } from '../measurement/measurement.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService],
  imports: [
    TypeOrmModule.forFeature([Download]),
    UserModule,
    MeasurementModule,
  ],
  exports: [
    DownloadService
  ]
})
export class DownloadModule {}

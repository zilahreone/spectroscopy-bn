import { Module } from '@nestjs/common';
import { DownloadService } from './download.service';
import { DownloadController } from './download.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Download } from './entities/download.entity';
import { UserModule } from '../user/user.module';
import { ExperimentModule } from '../experiment/experiment.module';

@Module({
  controllers: [DownloadController],
  providers: [DownloadService],
  imports: [
    TypeOrmModule.forFeature([Download]),
    UserModule,
    ExperimentModule
  ],
  exports: [
    DownloadService
  ]
})
export class DownloadModule {}

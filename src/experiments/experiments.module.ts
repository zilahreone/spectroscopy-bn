import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [ExperimentsController],
  providers: [
    ExperimentsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
  imports: [
    TypeOrmModule.forFeature([Experiment]),
    NestjsFormDataModule.config({
      storage: FileSystemStoredFile,  // MemoryStoredFile || FileSystemStoredFile
      fileSystemStoragePath: './tmp',
      cleanupAfterSuccessHandle: false,
      cleanupAfterFailedHandle : true,
    }),
  ],
})
export class ExperimentsModule {}

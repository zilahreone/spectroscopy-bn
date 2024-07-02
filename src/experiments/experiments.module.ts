import { Module } from '@nestjs/common';
import { ExperimentsService } from './experiments.service';
import { ExperimentsController } from './experiments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExperimentsController],
  
  providers: [
    ExperimentsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([Experiment]),
    NestjsFormDataModule.config({}),
    // NestjsFormDataModule.config({
    //   storage: FileSystemStoredFile,  // MemoryStoredFile || FileSystemStoredFile
    //   fileSystemStoragePath: process.env.UPLOAD_DIR,
    //   cleanupAfterSuccessHandle: false,
    //   cleanupAfterFailedHandle : true,
    // }),
    AuthModule
  ],
})
export class ExperimentsModule {}

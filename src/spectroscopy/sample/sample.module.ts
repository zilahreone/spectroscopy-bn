import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';
import { ChemicalModule } from '../chemical/chemical.module';
import { CategoryModule } from '../category/category.module';
import { OrganizationModule } from '../organization/organization.module';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [
    TypeOrmModule.forFeature([Sample]),
    ChemicalModule,
    CategoryModule,
    OrganizationModule,
    NestjsFormDataModule.config({}),
    // NestjsFormDataModule.config({
    //   storage: FileSystemStoredFile,  // MemoryStoredFile || FileSystemStoredFile
    //   fileSystemStoragePath:'ul_test',
    //   cleanupAfterSuccessHandle: false,
    //   cleanupAfterFailedHandle : true,
    // }),
  ],
  exports: [
    SampleService
  ]
})
export class SampleModule {}

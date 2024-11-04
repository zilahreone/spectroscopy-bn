import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';
import { MaterialModule } from '../material/material.module';
import { CategoryModule } from '../category/category.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [
    TypeOrmModule.forFeature([Sample]),
    MaterialModule,
    CategoryModule,
    OrganizationModule
  ],
  exports: [
    SampleService
  ]
})
export class SampleModule {}

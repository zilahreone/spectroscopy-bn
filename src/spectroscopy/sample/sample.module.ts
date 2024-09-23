import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
  imports: [
    TypeOrmModule.forFeature([Sample])
  ]
})
export class SampleModule {}

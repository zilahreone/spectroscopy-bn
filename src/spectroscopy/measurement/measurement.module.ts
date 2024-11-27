import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AppModule } from 'src/app.module';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementService],
  imports: [
    TypeOrmModule.forFeature([Measurement]),
    NestjsFormDataModule.config({}),
  ],
  exports: [MeasurementService]
})
export class MeasurementModule {}

import { Module } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementService],
  imports: [
    TypeOrmModule.forFeature([Measurement])
  ],
  exports: [MeasurementService]
})
export class MeasurementModule {}

import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrument } from './entities/instrument.entity';
import { Experiment } from '../experiment/entities/experiment.entity';
import { TechniqueModule } from '../technique/technique.module';
import { EquipmentTypeModule } from '../equipment-type/equipment-type.module';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService],
  imports: [
    TypeOrmModule.forFeature([Instrument]),
    TechniqueModule,
    EquipmentTypeModule
  ],
  exports: [
    InstrumentService
  ]
})
export class InstrumentModule {}

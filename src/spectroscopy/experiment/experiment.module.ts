import { Module } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { ExperimentController } from './experiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { SampleModule } from '../sample/sample.module';
import { OrganizationModule } from '../organization/organization.module';
import { UserModule } from '../user/user.module';
import { TechniqueModule } from '../technique/technique.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { EquipmentTypeModule } from '../equipment-type/equipment-type.module';
import { InstrumentModule } from '../instrument/instrument.module';

@Module({
  controllers: [ExperimentController],
  providers: [ExperimentService],
  imports: [
    TypeOrmModule.forFeature([Experiment]),
    NestjsFormDataModule.config({}),
    SampleModule,
    OrganizationModule,
    UserModule,
    TechniqueModule,
    EquipmentTypeModule,
    InstrumentModule
  ],
  exports: [ExperimentService]
})
export class ExperimentModule {}

import { Module } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { ExperimentController } from './experiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';
import { SampleModule } from '../sample/sample.module';
import { OrganizationModule } from '../organization/organization.module';
import { UserModule } from '../user/user.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { TechniqueModule } from '../technique/technique.module';
import { InstrumentModule } from '../instrument/instrument.module';

@Module({
  controllers: [ExperimentController],
  providers: [ExperimentService],
  imports: [
    TypeOrmModule.forFeature([Experiment]),
    SampleModule,
    OrganizationModule,
    UserModule,
    MeasurementModule,
    TechniqueModule,
    InstrumentModule
  ]
})
export class ExperimentModule {}

import { Module } from '@nestjs/common';
import { ExperimentService } from './experiment.service';
import { ExperimentController } from './experiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experiment } from './entities/experiment.entity';

@Module({
  controllers: [ExperimentController],
  providers: [ExperimentService],
  imports: [
    TypeOrmModule.forFeature([Experiment])
  ]
})
export class ExperimentModule {}

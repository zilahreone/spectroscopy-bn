import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MeasurementService } from './measurement.service';
import { MeasurementController } from './measurement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measurement } from './entities/measurement.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ExperimentModule } from '../experiment/experiment.module';
import { AppModule } from 'src/app.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [MeasurementController],
  providers: [MeasurementService],
  imports: [
    TypeOrmModule.forFeature([Measurement]),
    NestjsFormDataModule.config({}),
    ExperimentModule,
    forwardRef(() => AppModule)
  ],
  exports: [MeasurementService]
})
export class MeasurementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes(MeasurementController);
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ExperimentsModule } from './spectroscopy/experiments/experiments.module';
// import { Experiment } from './spectroscopy/experiments/entities/experiment.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { dataSourceOptions } from 'db/data-source';
import { DownloadModule } from './spectroscopy/download/download.module';
import { UserModule } from './spectroscopy/user/user.module';
import { OrganizationModule } from './spectroscopy/organization/organization.module';
import { MeasurementModule } from './spectroscopy/measurement/measurement.module';
import { TechniqueModule } from './spectroscopy/technique/technique.module';
import { CategoryModule } from './spectroscopy/category/category.module';
import { SampleModule } from './spectroscopy/sample/sample.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { HttpExceptionFilter } from './all-exceptions.filter';
import { User } from './spectroscopy/user/entities/user.entity';
import { ExperimentModule } from './spectroscopy/experiment/experiment.module';
import { ChemicalModule } from './spectroscopy/chemical/chemical.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { InstrumentModule } from './spectroscopy/instrument/instrument.module';
import { EquipmentTypeModule } from './spectroscopy/equipment-type/equipment-type.module';
// import { FormModule } from './spectroscopy/form/form.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    // ExperimentsModule,
    // AuthModule,
    DownloadModule,
    UserModule,
    OrganizationModule,
    MeasurementModule,
    TechniqueModule,
    CategoryModule,
    SampleModule,
    ExperimentModule,
    ChemicalModule,
    InstrumentModule,
    EquipmentTypeModule,
    // FormModule,
    // ServeStaticModule.forRoot({
    // resolve`('./uploads/test/test/')
    // serveStaticOptions: { index: false },
    // rootPath: join(__dirname, '..', 'uploads'),
    // serveRoot: 'uploads',
    // }),
  ]
})
export class AppModule { }

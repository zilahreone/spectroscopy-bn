import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentsModule } from './spectroscopy/experiments/experiments.module';
import { Experiment } from './spectroscopy/experiments/entities/experiment.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { dataSourceOptions } from 'db/data-source';
import { DownloadModule } from './spectroscopy/download/download.module';
import { UserModule } from './spectroscopy/user/user.module';
import { OrganizationModule } from './spectroscopy/organization/organization.module';
import { SController } from './spectroscopy/test/s/s.controller';
import { MeasurementModule } from './spectroscopy/measurement/measurement.module';
import { TechniqueModule } from './spectroscopy/technique/technique.module';
import { CategoryModule } from './spectroscopy/category/category.module';
import { SpectroscopysampleModule } from './spectroscopysample/spectroscopysample.module';
import { SampleModule } from './spectroscopy/sample/sample.module';

@Module({
  controllers: [AppController, SController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ExperimentsModule,
    AuthModule,
    DownloadModule,
    UserModule,
    OrganizationModule,
    MeasurementModule,
    TechniqueModule,
    CategoryModule,
    SpectroscopysampleModule,
    SampleModule,
    // ServeStaticModule.forRoot({
      // resolve`('./uploads/test/test/')
      // serveStaticOptions: { index: false },
      // rootPath: join(__dirname, '..', 'uploads'),
      // serveRoot: 'uploads',
    // }),
  ],
})
export class AppModule {}

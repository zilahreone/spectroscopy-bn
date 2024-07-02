import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperimentsModule } from './experiments/experiments.module';
import { Experiment } from './experiments/entities/experiment.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './spectroscopy.sqlite',
      entities: [Experiment],
      synchronize: process.env.NODE_ENV != 'production',
    }),
    ExperimentsModule,
    AuthModule,
    ServeStaticModule.forRoot({
      // resolve`('./uploads/test/test/')
      rootPath: join(__dirname, '..', process.env.UPLOAD_DIR),
      serveRoot: `/eiei`,
      // serveStaticOptions: { index: false },
    }),
  ],
})
export class AppModule {}

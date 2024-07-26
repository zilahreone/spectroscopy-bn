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
import { dataSourceOptions } from 'db/data-source';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ExperimentsModule,
    AuthModule,
    // ServeStaticModule.forRoot({
      // resolve`('./uploads/test/test/')
      // serveStaticOptions: { index: false },
      // rootPath: join(__dirname, '..', 'uploads'),
      // serveRoot: 'uploads',
    // }),
  ],
})
export class AppModule {}

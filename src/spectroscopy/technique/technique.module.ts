import { Module } from '@nestjs/common';
import { TechniqueService } from './technique.service';
import { TechniqueController } from './technique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique } from './entities/technique.entity';

@Module({
  controllers: [TechniqueController],
  providers: [TechniqueService],
  imports: [
    TypeOrmModule.forFeature([Technique])
  ]
})
export class TechniqueModule {}

import { Module } from '@nestjs/common';
import { TechniqueService } from './technique.service';
import { TechniqueController } from './technique.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique } from './entities/technique.entity';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [TechniqueController],
  providers: [TechniqueService],
  imports: [
    TypeOrmModule.forFeature([Technique]),
    CategoryModule
  ],
  exports: [TechniqueService]
})
export class TechniqueModule {}

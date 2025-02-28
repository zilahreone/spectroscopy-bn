import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { ChemicalModule } from '../chemical/chemical.module';
import { TechniqueModule } from '../technique/technique.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([Category]),
    // ChemicalModule,
    // TechniqueModule
    AuthModule
  ],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}

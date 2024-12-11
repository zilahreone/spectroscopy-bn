import { Module } from '@nestjs/common';
import { ChemicalService } from './chemical.service';
import { ChemicalController } from './chemical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chemical } from './entities/chemical.entity';
// import { FormModule } from '../form/form.module';

@Module({
  controllers: [ChemicalController],
  providers: [ChemicalService],
  imports: [
    TypeOrmModule.forFeature([Chemical]),
    // FormModule
  ],
  exports: [
    ChemicalService
  ]
})
export class ChemicalModule {}

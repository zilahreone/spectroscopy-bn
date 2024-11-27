import { Module } from '@nestjs/common';
import { EquipmentTypeService } from './equipment-type.service';
import { EquipmentTypeController } from './equipment-type.controller';
import { EquipmentType } from './entities/equipment-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EquipmentTypeController],
  providers: [EquipmentTypeService],
  imports:[
    TypeOrmModule.forFeature([EquipmentType]),
  ],
  exports: [
    EquipmentTypeService
  ]
})
export class EquipmentTypeModule {}

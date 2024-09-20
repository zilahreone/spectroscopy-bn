import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { Organization } from './entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [
    TypeOrmModule.forFeature([Organization]),
  ]
})
export class OrganizationModule {}

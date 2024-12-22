import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.repository.save(createOrganizationDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: { users: true, experiments: true, samples: true } });
  }

  async findOne(id: { name: string } | { id: string}) {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { users: true } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    await this.findOne({id});
    try {
      return await this.repository.update(id, updateOrganizationDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne({id});
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}

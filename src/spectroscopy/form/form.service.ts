import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private readonly repository: Repository<Form>,
  ) { }
  async create(createFormDto: CreateFormDto) {
    try {
      return await this.repository.save(createFormDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    return await this.repository.find({ relations: {} })
  }

  async findOne(id: { name: string } | { id: string}) {
    try {
      return await this.repository.findOneByOrFail(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    await this.findOne({id});
    try {
      return await this.repository.update(id, updateFormDto);
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

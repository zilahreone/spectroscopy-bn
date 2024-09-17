import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.repository.save(createUserDto);
    } catch (err) {
      throw new NotImplementedException(`${err}`)
    }
  }

  async findAll(id: string) {
    try {
      return await this.repository.findBy({
        id: id
      });
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneBy({ id });
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.repository.update(id, updateUserDto);
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.repository.delete({ id: id })
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }
}

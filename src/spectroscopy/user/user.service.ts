import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly organizationService: OrganizationService,
    private readonly authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const organization = await this.organizationService.findOne({id: createUserDto.organizationId})
    try {
      return await this.repository.insert({...createUserDto, organization: organization})
    } catch (err) {
      throw new NotImplementedException(`${err}`)
    }
  }

  async findAll() {
    // const jwt_decode = this.authService.getJWTDecode();
    // if (jwt_decode) {
    //   try {
    //     return await this.repository.findBy({
    //       id: jwt_decode['sub']
    //     });
    //   } catch (err) {
    //     throw new NotImplementedException(`${err}`);
    //   }
    // }
    // throw new UnauthorizedException();
    return await this.repository.find({ relations: { downloads: true, organization: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneBy({ id });
    } catch (err) {
      throw new NotFoundException(`${err}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateUserDto);
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.repository.delete({ id: id })
    } catch (err) {
      throw new NotImplementedException(`${err}`);
    }
  }
}

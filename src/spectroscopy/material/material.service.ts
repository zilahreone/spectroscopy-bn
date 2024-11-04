import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly repository: Repository<Material>,
  ) { }
  async create(createMaterialDto: CreateMaterialDto) {
    try {
      return await this.repository.save(createMaterialDto)
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    // const chem: string[] = [
    //   'Glucose',
    //   'Fructose',
    //   'D-Xylose',
    //   'L-Xylose',
    //   'Arabinose',
    //   'Sorbitol',
    //   'Xylitol',
    //   'FDCA',
    //   'Glycolic acid',
    //   'Citric acid',
    //   'Succinic acid',
    //   'Isosorbide',
    //   'Furfural',
    //   'Furfuryl alcohol',
    //   '5-HMF',
    //   'Levulinic acid',
    //   'r-Valerolactone',
    //   'D-Lactic acid',
    //   'L-Lactic acid',
    //   'Formic acid',
    //   'Acetic acid',
    //   'Lactic acid']
    // chem.forEach(c => this.create({ name: c, description: '' }))
    // const all = await this.repository.find({ relations: { samples: true } })
    // all.map(a => this.remove(a.id))
    return await this.repository.find({ relations: { samples: true } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateMaterialDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      console.log();
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}

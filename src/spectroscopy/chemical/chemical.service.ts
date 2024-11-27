import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chemical } from './entities/chemical.entity';

@Injectable()
export class ChemicalService {
  constructor(
    @InjectRepository(Chemical)
    private readonly repository: Repository<Chemical>,
  ) { }
  async create(createChemicalDto: CreateChemicalDto) {
    try {
      return await this.repository.save(createChemicalDto)
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
    return await this.repository.find({ relations: { } })
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOneByOrFail({ name: id });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateChemicalDto: UpdateChemicalDto) {
    await this.findOne(id);
    try {
      return await this.repository.update(id, updateChemicalDto);
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }
}

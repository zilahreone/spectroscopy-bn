import { Injectable, NotFoundException, NotImplementedException, StreamableFile } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream, createWriteStream, rmSync } from 'fs';
import * as archiver from 'archiver';
import { join } from 'path';
import { AuthService } from 'src/auth/auth.service';
// import { ChemicalService } from '../chemical/chemical.service';
// import { TechniqueService } from '../technique/technique.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    // private readonly chemicalService: ChemicalService,
    // private readonly techniqueService: TechniqueService
    private readonly authService: AuthService
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {
    // const chemical = await this.chemicalService.findOne({id: createCategoryDto.chemicalId})
    // const technique = await this.techniqueService.findOne(createCategoryDto.techniqueId)
    try {
      return await this.repository.save({ ...createCategoryDto })
    } catch (error) {
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    // const jwtDecode = this.authService.getJWTDecode()
    // console.log(
    //   jwtDecode['realm_access']['roles']
    // );
    return await this.repository.find({ relations: {} })
  }

  async findAndCount() {
    return (await this.findAllRelations()).reduce((prev, curr) => {
      const expCount = curr.samples.reduce((sPrev, sCurr) => {
        return sPrev + sCurr.experiments.length
      }, 0)
      prev.push({
        id: curr.id,
        name: curr.name,
        description: curr.description,
        experimentCount: expCount
      })
      return prev
    }, [])
  }

  async findAllRelations() {
    return await this.repository.find({ relations: { samples: { experiments: true } } })
  }

  async findOne(id: { name: string } | { id: string }) {
    try {
      return await this.repository.findOneOrFail({ where: id, relations: { samples: true } });
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async findOneRelation(id: { name: string } | { id: string }) {
    try {
      return (await this.repository.findOneOrFail({ where: id, relations: { samples: { experiments: true } } })).samples.map(sam => (sam.experiments.map(exp => ({ id: exp.id, name: exp.name }))));
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne({ id });
    // const chemical = await this.chemicalService.findOne({id: updateCategoryDto.chemicalId})
    try {
      return await this.repository.update(id, { ...updateCategoryDto });
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  async remove(id: string) {
    await this.findOne({ id });
    try {
      return await this.repository.delete({ id })
    } catch (error) {
      throw new NotImplementedException(`${error}`);
    }
  }

  streamFile(): StreamableFile {
    // rmSync('./example.zip', { force: true })
    // console.log(join(process.cwd(), 'example.zip'));
    const output = createWriteStream(join(process.cwd(), '/uploads/example.zip'));
    const archive = archiver('zip', {
      zlib: { level: 0 } // Sets the compression level.
    });
    archive.pipe(output);
    const file = createReadStream(join(process.cwd(), 'package.json'));
    archive.append(file, { name: 'package.json' });
    archive.finalize();
    const zip = createReadStream(join(process.cwd(), '/uploads/example.zip'));
    return new StreamableFile(zip, {
      disposition: 'attachment; filename="example.zip"',
    });
  }
}

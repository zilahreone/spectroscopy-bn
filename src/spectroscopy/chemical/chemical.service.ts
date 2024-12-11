import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chemical } from './entities/chemical.entity';
// import { FormService } from '../form/form.service';

@Injectable()
export class ChemicalService {
  constructor(
    @InjectRepository(Chemical)
    private readonly repository: Repository<Chemical>,
    // private readonly formService: FormService
  ) { }
  async create(createChemicalDto: CreateChemicalDto) {
    // const form = await this.formService.findOne(createChemicalDto.formId)
    try {
      return await this.repository.save({...createChemicalDto})
    } catch (error) {
      console.log(createChemicalDto);
      throw new NotImplementedException(`${error}`)
    }
  }

  async findAll() {
    const chems = await this.repository.find({ relations: {} })
    // console.log(chems.length);
    
    // if (chems.length === 0) {
    //   const chem: string[] = [
    //     "Glucose",
    //     "Fructose",
    //     "D-Xylose",
    //     "L-Xylose",
    //     "Arabinose",
    //     "Sorbitol",
    //     "Xylitol",
    //     "FDCA",
    //     "Glycolic acid",
    //     "Citric acid",
    //     "Succinic acid",
    //     "Isosorbide",
    //     "5-HMF",
    //     "Acetic acid",
    //     "Furfural",
    //     "Furfuryl alcohol",
    //     "Levulinic acid",
    //     "r-Valerolactone",
    //     "D-Lactic acid",
    //     "L-Lactic acid",
    //     "Formic acid",
    //     "Lactic acid",
    //     "4-MBA",
    //     "Crystal violet",
    //     "R6G",
    //     "R6G (1×10-5 M)",
    //     "CBD (100 PPM)",
    //     "CBN (100 PPM)",
    //     "THC (100 PPM)",
    //     "THC (10 PPM)",
    //     "CBN (1 PPM)",
    //     "CBN (0.5 PPM)",
    //     "CBN (0.25 PPM)",
    //     "Paraquat (1×10-1 M)",
    //     "Paraquat (1×10-2 M)",
    //     "Paraquat (1×10-3 M)",
    //     "Paraquat (1×10-4 M)",
    //     "Paraquat (1×10-5 M)",
    //     "Paraquat (1×10-6 M)",
    //     "Paraquat (1×10-7 M)",
    //     "Paraquat (1×10-8 M)",
    //     "Cypermethrin (1×10-1 M)",
    //     "Cypermethrin (1×10-2 M)",
    //     "Cypermethrin (1×10-3 M)",
    //     "Cypermethrin (1×10-4 M)",
    //     "Cypermethrin (1×10-5 M)",
    //     "Cypermethrin (1×10-6 M)",
    //     "Cypermethrin (1×10-7 M)",
    //     "Carbaryl (1×10-1 M)",
    //     "Carbaryl (1×10-2 M)",
    //     "Carbaryl (1×10-3 M)",
    //     "Carbaryl (1×10-4 M)",
    //     "Carbaryl (1×10-5 M)",
    //     "Carbaryl (1×10-6 M)",
    //     "Carbaryl (1×10-7 M)",
    //     "Chlorpyrifos",
    //     "Chlorpyrifos (1×10-1 M)",
    //     "Chlorpyrifos (1×10-2 M)",
    //     "Chlorpyrifos (1×10-3 M)",
    //     "Chlorpyrifos (1×10-4 M)",
    //     "Chlorpyrifos (1×10-5 M)",
    //     "Methyl Parathion",
    //     "Paraqaut",
    //     "Glyphosate",
    //     "Paraquat (5×10-7 M)",
    //     "Paraquat (2.5×10-7 M)",
    //     "Formalin 1000 ug/l",
    //     "Enrofloxacin",
    //     "Norfloxacin",
    //     "Pefloxacin",
    //     "Sulfamethoxazole",
    //     "Oxytetracycline",
    //     "Uric acid",
    //     "Calcium oxalate",
    //     "Calcium phosphate",
    //     "Dengue fever/DF",
    //     "Dengue hemorrhagic fever/DHF",
    //     "Paracetamol",
    //     "Diclofenac",
    //     "Ibuprofen",
    //     "Graphene/Si",
    //     "Graphene/Cu ",
    //     "Graphene/Ni",
    //     "Graphene/SOG",
    //     "Polyimide ",
    //     "PDMS",
    //     "Boron",
    //     "Natural rubber",
    //     "GO",
    //     "rGO",
    //     "Mxene",
    //     "Antimony ",
    //     "Graphene",
    //     "Plastic PE",
    //     "Silicon wafer"
    //   ]
    //   chem.forEach(async c => {
    //     const created = await this.create({ name: c, description: '' })
    //     // console.log(created);
    //   }
    // )
    // } else {
    //   const all = await this.repository.find({ relations: { samples: true } })
    //   all.map(a => this.remove(a.id))
    // }
    return await this.repository.find({ relations: {}, order: { name: 'ASC'} })
  }

  async findOne(id: { name: string } | { id: string}) {
    try {
      return await this.repository.findOneByOrFail(id);
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(id: string, updateChemicalDto: UpdateChemicalDto) {
    await this.findOne({id});
    // const form = await this.formService.findOne(updateChemicalDto.formId)
    try {
      return await this.repository.update(id, {...updateChemicalDto});
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
}

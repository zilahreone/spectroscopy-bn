import { Category } from "src/spectroscopy/category/entities/category.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Chemical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.chemical)
  samples: Sample[];

  // @RelationId((chemical: Chemical) => chemical.samples)
  // samplesId: string[]

  @OneToMany(() => Category, (category: Category) => category.chemical)
  categorys: Category[];
}

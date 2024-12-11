// import { Chemical } from "src/spectroscopy/chemical/entities/chemical.entity";
// import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
// import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.category)
  samples: Sample[];

  // @RelationId((category: Category) => category.samples)
  // samplesId: string[]

  // @ManyToOne(() => Technique, (technique: Technique) => technique.categorys)
  // technique: Technique;

  // @ManyToOne(() => Category, (category: Category) => category.techniques)
  // category: Category;

  // @ManyToOne(() => Chemical, (chemical: Chemical) => chemical.categorys)
  // chemical: Chemical;
}

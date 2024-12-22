// import { Category } from "src/spectroscopy/category/entities/category.entity";
// import { Form } from "src/spectroscopy/form/entities/form.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Chemical {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.chemical)
  samples: Sample[];

  // @RelationId((chemical: Chemical) => chemical.samples)
  // samplesId: string[]

  // @OneToMany(() => Category, (category: Category) => category.chemical)
  // categorys: Category[];

  // @ManyToOne(() => Form, (form: Form) => form.chemicals)
  // form: Form;
}

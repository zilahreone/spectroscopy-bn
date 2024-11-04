import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

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

  @RelationId((category: Category) => category.samples)
  samples_id: string[]
}

import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.material)
  samples: Sample[];

  @RelationId((material: Material) => material.samples)
  samples_id: string[]
}

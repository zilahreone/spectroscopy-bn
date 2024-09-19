import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.material)
  samples: Sample[];
}

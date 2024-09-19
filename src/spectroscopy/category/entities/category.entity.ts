import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Sample, (sample: Sample) => sample.category)
  samples: Sample[];
}

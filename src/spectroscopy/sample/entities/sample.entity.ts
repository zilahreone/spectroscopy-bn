import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.sample)
  experiment: Experiment[];
}

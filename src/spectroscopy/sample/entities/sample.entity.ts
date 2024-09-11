import { Experiment } from "src/spectroscopy/experiments/entities/experiment.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.sample)
  experiment: Experiment
}

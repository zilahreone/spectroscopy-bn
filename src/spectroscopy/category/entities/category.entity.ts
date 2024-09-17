// import { Experiment } from "src/spectroscopy/experiments/entities/experiment.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  // @OneToMany(() => Experiment, (experiment: Experiment) => experiment.category)
  // experiments: Experiment[];
}

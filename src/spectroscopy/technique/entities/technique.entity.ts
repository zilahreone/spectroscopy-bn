import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technique {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.techniques)
  measurement: Measurement;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.technique)
  experiments: Experiment[];

}

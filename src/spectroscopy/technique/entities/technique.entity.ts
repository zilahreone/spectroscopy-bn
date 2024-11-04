import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Technique {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  })
  name: string;

  @Column()
  description: string;

  // @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.techniques)
  // measurement: Measurement;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.technique)
  experiments: Experiment[];

  @RelationId((technique: Technique) => technique.experiments)
  experiments_id: string[]

}

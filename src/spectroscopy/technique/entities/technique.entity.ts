import { Category } from "src/spectroscopy/category/entities/category.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Instrument } from "src/spectroscopy/instrument/entities/instrument.entity";
import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Technique {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Instrument, (instrument: Instrument) => instrument.technique)
  instruments: Instrument[];

  @RelationId((technique: Technique) => technique.instruments)
  instrumentsId: string[];
  
  // @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.techniques)
  // measurement: Measurement;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.technique)
  experiments: Experiment[];

  @RelationId((technique: Technique) => technique.experiments)
  experimentsId: string[]

  @ManyToOne(() => Category, (category: Category) => category.techniques)
  category: Category;

}

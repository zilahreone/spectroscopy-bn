import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technique {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.technique)
  measurement: Measurement;

  @Column()
  name: string;

  @Column()
  description: string;
}

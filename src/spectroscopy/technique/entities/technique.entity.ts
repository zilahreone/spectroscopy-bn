import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

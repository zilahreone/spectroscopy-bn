import { Download } from "src/spectroscopy/download/entities/download.entity";
// import { Experiment } from "src/spectroscopy/experiments/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Download, (download: Download) => download.measurement)
  download: Download[];
  
  // @ManyToOne(() => Experiment, (experiment: Experiment) => experiment.measurement)
  // experiment: Experiment;

  @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  technique: Technique[];
}

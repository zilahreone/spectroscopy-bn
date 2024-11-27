import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";

class MeasurementCondition {
  @Column()
  accumulations: number

  @Column({ nullable: true })
  waveLength: string

  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  beamSplitter: string;

  @Column({ nullable: true })
  detector: string;

  @Column({ nullable: true })
  laserPower: string

  @Column({ nullable: true })
  exposureTime: string

  @Column({ nullable: true })
  lens: string
}

class MeasurementTechniqueSERS {
  @Column()
  chip: string;

  @Column()
  nanoparticles: string;

  @Column()
  papers: string;

  @Column()
  other: string;
}

class MeasurementTechnique {
  @Column(() => MeasurementTechniqueSERS)
  sers: MeasurementTechniqueSERS
}

class File {
  @Column()
  name: string

  // @Column()
  // path: string

  @Column('int')
  size: number

  @Column()
  mimeType: string

  @Column()
  fileExt: string
}

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @Column(() => MeasurementCondition)
  measurementCondition: MeasurementCondition;

  @Column(() => MeasurementTechnique)
  measurementTechnique: string | MeasurementTechnique;

  @Column({ nullable: true })
  measurementRange: string;

  @Column({ nullable: true })
  typeData: string;

  @Column('json', { nullable: true })
  files: File[]

  @OneToMany(() => Download, (download: Download) => download.measurement)
  downloads: Download[];

  @RelationId((measurement: Measurement) => measurement.downloads) // you need to specify target relation
  downloadsId: string[]

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.measurement)
  experiments: Experiment[];

  @RelationId((measurement: Measurement) => measurement.experiments) // you need to specify target relation
  experimentsId: string[]

  // @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  // techniques: Technique[];
}

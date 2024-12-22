import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique, UpdateDateColumn } from "typeorm";

class MeasurementCondition {
  @Column('integer')
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
  @Column({ nullable: true })
  chip: string;

  @Column({ nullable: true })
  nanoparticles: string;

  @Column({ nullable: true })
  papers: string;

  @Column({ nullable: true })
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
@Unique(['name'])
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @Column({ nullable: true })
  // spectrumDescription: string

  // @Column({ nullable: true })
  // remark: string;

  @Column(() => MeasurementCondition)
  measurementCondition: MeasurementCondition;

  @Column(() => MeasurementTechnique)
  measurementTechnique: string | MeasurementTechnique;

  @Column({ nullable: true })
  measurementRange: string;

  @Column({ nullable: true })
  typeData: string;

  @Column(() => File)
  attachment: File

  // @CreateDateColumn({ name: 'create_at' })
  // createAt: Date;

  // @UpdateDateColumn({ nullable: true, name: 'update_at' })
  // updateAt: Date;

  @OneToMany(() => Download, (download: Download) => download.measurement)
  downloads: Download[];

  // @RelationId((measurement: Measurement) => measurement.downloads) // you need to specify target relation
  // downloadsId: string[]

  @ManyToOne(() => Experiment, (experiment: Experiment) => experiment.measurements)
  experiment: Experiment;

  // @RelationId((measurement: Measurement) => measurement.experiments) // you need to specify target relation
  // experimentsId: string[]

  // @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  // techniques: Technique[];
}

import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique, UpdateDateColumn } from "typeorm";

class MeasurementConditionBase {

  @Column('integer')
  accumulations: number
}

class TDSMeasurementCondition extends MeasurementConditionBase {
  @Column({ nullable: true })
  waveLength: string
}

class FTIRMeasurementCondition extends MeasurementConditionBase {
  @Column({ nullable: true })
  source: string;

  @Column({ nullable: true })
  beamSplitter: string;

  @Column({ nullable: true })
  detector: string;
}

class RAMANMeasurementCondition extends MeasurementConditionBase {

  @Column({ nullable: true })
  waveLength: string

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

class RAMANMeasurementTechnique {
  @Column(() => MeasurementTechniqueSERS)
  sers: MeasurementTechniqueSERS
}

class File {
  @Column()
  name: string;

  // @Column()
  // path: string

  @Column('int')
  size: number;

  @Column()
  mimeType: string;

  @Column()
  fileExt: string;
}

class RAMAN {
  @Column(() => RAMANMeasurementCondition)
  measurementCondition: RAMANMeasurementCondition;

  @Column(() => RAMANMeasurementTechnique)
  measurementTechnique: RAMANMeasurementTechnique;

  @Column()
  typeData: string;
}

class FTIR {
  @Column(() => FTIRMeasurementCondition)
  measurementCondition: FTIRMeasurementCondition;

  @Column()
  measurementTechnique: string;

  @Column({ nullable: true })
  measurementRange: string;
}

class TDS {
  @Column(() => TDSMeasurementCondition)
  measurementCondition: TDSMeasurementCondition;

  @Column()
  binder: string;

}

@Entity()
@Unique(['name'])
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  spectrumDescription: string

  @Column({ nullable: true })
  remark: string;

  @Column('json', { nullable: true })
  raman: RAMAN;

  // @Column('json', { nullable: true, default: {} })
  // raman: RAMAN;
  
  // @Column('json', { nullable: true, default: {} })
  // ftir: FTIR;
  
  // @Column('json', { nullable: true })
  // tds: TDS | null

  @Column(() => File)
  attachment: File

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  // @OneToMany(() => Download, (download: Download) => download.measurement)
  // downloads: Download[];

  // @RelationId((measurement: Measurement) => measurement.downloads) // you need to specify target relation
  // downloadsId: string[]

  @ManyToOne(() => Experiment, (experiment: Experiment) => experiment.measurements)
  experiment: Experiment;

  // @RelationId((measurement: Measurement) => measurement.experiments) // you need to specify target relation
  // experimentsId: string[]

  // @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  // techniques: Technique[];
}

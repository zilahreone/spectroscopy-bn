import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parameters: string;

  @Column('json', { nullable: true })
  files: Files[]

  @OneToMany(() => Download, (download: Download) => download.measurement)
  downloads: Download[];

  @RelationId((measurement: Measurement) => measurement.downloads) // you need to specify target relation
  downloads_id: string[]
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.measurement)
  experiments: Experiment[];

  @RelationId((measurement: Measurement) => measurement.experiments) // you need to specify target relation
  experiments_id: string[]

  // @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  // techniques: Technique[];
}

class Files {
  @Column()
  name: string
  
  // @Column()
  // path: string
  
  @Column('int')
  size: number
  
  @Column()
  mime_type: string
  
  @Column()
  file_ext: string
}

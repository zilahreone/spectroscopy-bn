import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.measurement)
  experiments: Experiment[];

  @OneToMany(() => Technique, (technique: Technique) => technique.measurement)
  techniques: Technique[];
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

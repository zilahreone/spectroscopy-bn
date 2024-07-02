import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

class User {
  @Column()
  id: string
  
  @Column()
  name: string
}

export class Files {
  @Column()
  file_name: string
  
  @Column()
  path: string
  
  @Column('int')
  size: number
  
  @Column()
  mime_type: string
  
  @Column()
  file_ext: string
}

@Entity()
export class Experiment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  experiment_name: string;

  @Column()
  chemical_name: string;

  @Column(() => User)
  created_by: User

  @CreateDateColumn()
  created_at: Date

  @Column('json', { nullable: false })
  files: Files[]
  
  @Column('json', { nullable: true })
  others_attachments: Files[]

  @Column()
  date_collection: string;

  @Column()
  measurement_technique: string;

  @Column()
  organization: string;

  @Column()
  collected_by: string;

  @Column()
  instrument: string;

  @Column()
  type: string;

  @Column()
  normalization: string;
}

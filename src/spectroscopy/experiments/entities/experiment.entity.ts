import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

class User {
  @Column()
  id: string
  
  @Column({ nullable: true })
  name: string

  @Column()
  preferred_username: string

  @Column({ nullable: true })
  given_name: string

  @Column({ nullable: true })
  family_name: string

  @Column()
  email: string
}

export class Files {
  @Column()
  name: string
  
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

  // @Column({ nullable: true })
  // colol: string

  @Column()
  experiment_name: string;

  @Column()
  chemical_name: string;
  
  @Column()
  chemical_id: string;

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

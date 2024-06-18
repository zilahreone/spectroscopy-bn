import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

class User {
  @Column()
  id: string
  
  @Column()
  name: string
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

  // @Column()
  // date_collection: string;

  // @Column()
  // measurement_technique: string;

  // @Column()
  // organization: string;

  // @Column()
  // collected_by: string;

  // @Column()
  // instrument: string;

  // @Column()
  // type: string;

  // @Column()
  // normalization: string;
}

import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user: User) => user.organization)
  user: User[]
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.organization)
  experiment: Experiment[]
}

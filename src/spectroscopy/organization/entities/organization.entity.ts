import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;
  
  @Column()
  contact: string;

  @OneToMany(() => User, (user: User) => user.organization)
  users: User[];
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.organization)
  experiments: Experiment[];
  
  @OneToMany(() => Sample, (sample: Sample) => sample.organization)
  samples: Sample[];
}

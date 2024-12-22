import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column()
  contact: string;

  @OneToMany(() => User, (user: User) => user.organization)
  users: User[];

  // @RelationId((organization: Organization) => organization.users)
  // usersId: string[]
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.organization)
  experiments: Experiment[];

  // @RelationId((organization: Organization) => organization.experiments)
  // experimentsId: string[]
  
  @OneToMany(() => Sample, (sample: Sample) => sample.organization)
  samples: Sample[];

  // @RelationId((organization: Organization) => organization.samples)
  // samplesId: string[]
}

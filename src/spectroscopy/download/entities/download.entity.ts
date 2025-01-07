import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Download {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  // @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.downloads)
  // measurement: Measurement;

  // @RelationId((download: Download) => download.measurement) // you need to specify target relation
  // measurementId: string

  @ManyToOne(() => Experiment, (experiment: Experiment) => experiment.downloads)
  experiment: Experiment;
  
  @ManyToOne(() => User, (user: User) => user.downloads)
  user: User;

  // @RelationId((download: Download) => download.user) // you need to specify target relation
  // userId: string
  
}

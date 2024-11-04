import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class Download {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.downloads)
  measurement: Measurement;

  @RelationId((download: Download) => download.measurement) // you need to specify target relation
  measurement_id: string
  
  @ManyToOne(() => User, (user: User) => user.downloads)
  user: User;

  @RelationId((download: Download) => download.user) // you need to specify target relation
  user_id: string
  
}

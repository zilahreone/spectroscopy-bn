import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Download {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.download)
  measurement: Measurement;

  @ManyToOne(() => User, (user: User) => user.download)
  user: User;
  
}

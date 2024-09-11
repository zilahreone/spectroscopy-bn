import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Download {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: 'NOW()' })
  timestamp: Date;

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.download)
  measurement: Measurement

  @ManyToOne(() => User, (user: User) => user.download)
  user: User;
  
}

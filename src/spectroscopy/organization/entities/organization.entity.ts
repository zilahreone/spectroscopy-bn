import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user: User) => user.organization)
  user: User
}

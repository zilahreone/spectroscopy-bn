import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  
  @Column('boolean', { default: false })
  is_active: boolean;

  @CreateDateColumn({ default: 'NOW()' })
  created_date: Date

  @Column({ nullable: true })
  preferred_username: string;

  @Column({ nullable: true })
  given_name: string;

  @Column({ nullable: true })
  family_name: string;

  @Column({ nullable: true })
  email: string;

  @Column('json')
  user: object;

  @OneToMany(() => Download, (download: Download) => download.user)
  downloads: Download[];
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.users)
  organization: Organization;
  
  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.user)
  experiments: Experiment[];

}

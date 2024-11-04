import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column('boolean', { default: false })
  is_active: boolean;

  @CreateDateColumn()
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

  @RelationId((user: User) => user.downloads)
  downloads_id: string[]

  @ManyToOne(() => Organization, (organization: Organization) => organization.users)
  organization: Organization;

  @RelationId((user: User) => user.organization) // you need to specify target relation
  organization_id: string

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.user)
  experiments: Experiment[];
  
  @RelationId((user: User) => user.experiments)
  experiments_id: string[]

}

import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column()
  name: string;

  @Column()
  preferredUsername: string;

  @Column()
  givenName: string;

  @Column()
  familyName: string;

  @Column({ nullable: true })
  email: string;

  @Column('json')
  user: object;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => Download, (download: Download) => download.user)
  downloads: Download[];

  // @RelationId((user: User) => user.downloads)
  // downloads_id: string[]

  @ManyToOne(() => Organization, (organization: Organization) => organization.users)
  organization: Organization;

  // @RelationId((user: User) => user.organization) // you need to specify target relation
  // organization_id: string

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.user)
  experiments: Experiment[];
  
  // @RelationId((user: User) => user.experiments)
  // experiments_id: string[]

}

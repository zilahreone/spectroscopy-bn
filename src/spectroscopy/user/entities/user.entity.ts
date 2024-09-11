import { Download } from "src/spectroscopy/download/entities/download.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class User {
  @Column()
  id: string;
  
  @Column('bool', { default: false })
  is_active: boolean;

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
  download: Download[];

  @ManyToOne(() => Organization, (organization: Organization) => organization.user)
  organization: Organization[];
}

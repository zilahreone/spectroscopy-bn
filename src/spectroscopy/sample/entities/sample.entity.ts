import { Category } from "src/spectroscopy/category/entities/category.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Material } from "src/spectroscopy/material/entities/material.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Sample {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  form: string;
  
  @Column()
  source: string;
  
  @Column()
  note: string;

  @Column('json')
  attachments: Files[]

  @Column('json')
  images: Files[]

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ nullable: true })
  update_at: Date;

  @ManyToOne(() => Material, (material: Material) => material.samples)
  material: Material;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.sample)
  experiments: Experiment[];

  @ManyToOne(() => Category, (category: Category) => category.samples)
  category: Category;
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.samples)
  organization: Organization;
  
}

class Files {
  @Column()
  name: string
  
  // @Column()
  // path: string
  
  @Column('int')
  size: number
  
  @Column()
  mime_type: string
  
  @Column()
  file_ext: string
}

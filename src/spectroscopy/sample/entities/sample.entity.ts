import { Category } from "src/spectroscopy/category/entities/category.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Material } from "src/spectroscopy/material/entities/material.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['name'])
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

  @RelationId((sample: Sample) => sample.material) // you need to specify target relation
  material_id: string

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.sample)
  experiments: Experiment[];

  @RelationId((sample: Sample) => sample.experiments)
  experiments_id: string[]

  @ManyToOne(() => Category, (category: Category) => category.samples)
  category: Category;

  @RelationId((sample: Sample) => sample.category) // you need to specify target relation
  category_id: string
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.samples)
  organization: Organization;

  @RelationId((sample: Sample) => sample.organization) // you need to specify target relation
  organization_id: string
  
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

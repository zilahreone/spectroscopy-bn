import { Category } from "src/spectroscopy/category/entities/category.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Chemical } from "src/spectroscopy/chemical/entities/chemical.entity";
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

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => Chemical, (chemical: Chemical) => chemical.samples)
  chemical: Chemical;

  // @RelationId((sample: Sample) => sample.chemical) // you need to specify target relation
  // @Column()
  // materialId: string

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.sample)
  experiments: Experiment[];

  @RelationId((sample: Sample) => sample.experiments)
  experimentsId: string[]

  // @ManyToOne(() => Category, (category: Category) => category.samples)
  // category: Category;

  // @RelationId((sample: Sample) => sample.category) // you need to specify target relation
  // categoryId: string
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.samples)
  organization: Organization;

  @RelationId((sample: Sample) => sample.organization) // you need to specify target relation
  @Column()
  organizationId: string
  
}

class Files {
  @Column()
  name: string
  
  // @Column()
  // path: string
  
  @Column('int')
  size: number
  
  @Column()
  mimeType: string
  
  @Column()
  fileExt: string
}

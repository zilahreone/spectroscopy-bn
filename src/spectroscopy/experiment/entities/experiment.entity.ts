import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Experiment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  experiment_name: string;

  @Column()
  chemical_name: string;

  @CreateDateColumn()
  create_at: Date

  @ManyToOne(() => Sample, (sample: Sample) => sample.experiment)
  sample: Sample

  @ManyToOne(() => Organization, (organization: Organization) => organization.experiment)
  organization: Organization
}

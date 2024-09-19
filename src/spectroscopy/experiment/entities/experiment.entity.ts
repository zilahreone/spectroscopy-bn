import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Experiment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  experiment_name: string;

  @Column()
  material_name: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn({ nullable: true })
  update_at: Date;

  @Column()
  instrument: string;

  @ManyToOne(() => User, (user: User) => user.experiments)
  user: User;

  @ManyToOne(() => Sample, (sample: Sample) => sample.experiments)
  sample: Sample;

  @ManyToOne(() => Organization, (organization: Organization) => organization.experiments)
  organization: Organization;
  
  @ManyToOne(() => Technique, (technique: Technique) => technique.experiments)
  technique: Technique;
  
  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.experiments)
  measurement: Measurement;
  
}

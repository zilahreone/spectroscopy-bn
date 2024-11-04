import { IsNotEmpty, IsUUID } from "class-validator";
import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";

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

  @RelationId((experiment: Experiment) => experiment.user) // you need to specify target relation
  user_id: string
  
  @ManyToOne(() => Sample, (sample: Sample) => sample.experiments)
  sample: Sample;

  @RelationId((experiment: Experiment) => experiment.sample) // you need to specify target relation
  sample_id: string
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.experiments)
  organization: Organization;

  @RelationId((experiment: Experiment) => experiment.organization) // you need to specify target relation
  organization_id: string

  @ManyToOne(() => Technique, (technique: Technique) => technique.experiments)
  technique: Technique;

  @RelationId((experiment: Experiment) => experiment.technique) // you need to specify target relation
  technique_id: string

  @ManyToOne(() => Measurement, (measurement: Measurement) => measurement.experiments)
  measurement: Measurement;

  @RelationId((experiment: Experiment) => experiment.measurement) // you need to specify target relation
  measurement_id: string
  
}

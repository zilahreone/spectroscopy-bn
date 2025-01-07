import { IsNotEmpty, IsUUID } from "class-validator";
import { Download } from "src/spectroscopy/download/entities/download.entity";
import { EquipmentType } from "src/spectroscopy/equipment-type/entities/equipment-type.entity";
import { Instrument } from "src/spectroscopy/instrument/entities/instrument.entity";
import { Measurement } from "src/spectroscopy/measurement/entities/measurement.entity";
import { Organization } from "src/spectroscopy/organization/entities/organization.entity";
import { Sample } from "src/spectroscopy/sample/entities/sample.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { User } from "src/spectroscopy/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['name'])
export class Experiment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn({ nullable: true })
  updateAt: Date;

  @ManyToOne(() => User, (user: User) => user.experiments)
  user: User;

  // @RelationId((experiment: Experiment) => experiment.user) // you need to specify target relation
  // userId: string
  
  @ManyToOne(() => Sample, (sample: Sample) => sample.experiments)
  sample: Sample;

  // @RelationId((experiment: Experiment) => experiment.sample) // you need to specify target relation
  // sampleId: string
  
  @ManyToOne(() => Organization, (organization: Organization) => organization.experiments)
  organization: Organization;

  // @RelationId((experiment: Experiment) => experiment.organization) // you need to specify target relation
  // organizationId: string

  @ManyToOne(() => Technique, (technique: Technique) => technique.experiments)
  technique: Technique;

  // @RelationId((experiment: Experiment) => experiment.technique) // you need to specify target relation
  // techniqueId: string

  @OneToMany(() => Measurement, (measurement: Measurement) => measurement.experiment)
  measurements: Measurement[];
  
  // @RelationId((experiment: Experiment) => experiment.measurement) // you need to specify target relation
  // measurementId: string

  @OneToMany(() => Download, (download: Download) => download.experiment)
  downloads: Download[];
  
  @ManyToOne(() => Instrument, (instrument: Instrument) => instrument.experiments)
  instrument: Instrument;
  
  // @RelationId((experiment: Experiment) => experiment.instrument) // you need to specify target relation
  // instrumentId: string
  
  @ManyToOne(() => EquipmentType, (equipmentType :EquipmentType) => equipmentType.experiments)
  equipmentType: EquipmentType

}

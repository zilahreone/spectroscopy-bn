import { EquipmentType } from "src/spectroscopy/equipment-type/entities/equipment-type.entity";
import { Experiment } from "src/spectroscopy/experiment/entities/experiment.entity";
import { Technique } from "src/spectroscopy/technique/entities/technique.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Instrument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @ManyToOne(() => Technique, (technique:Technique) => technique.instruments)
  technique: Technique;

  @OneToMany(() => Experiment, (experiment: Experiment) => experiment.instrument)
  experiments: Experiment[];

  @ManyToOne(() => EquipmentType, (equipmentType:EquipmentType) => equipmentType.instruments)
  equipmentType: EquipmentType;

  // @RelationId((instrument: Instrument) => instrument.experiments)
  // experimentsId: string[];
}

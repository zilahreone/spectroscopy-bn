import { Instrument } from "src/spectroscopy/instrument/entities/instrument.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, RelationId, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class EquipmentType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Instrument, (instrument: Instrument) => instrument.equipmentType)
  instruments: Instrument[];

  @RelationId((equipmentType: EquipmentType) => equipmentType.instruments)
  instrumentsId: string[];

}

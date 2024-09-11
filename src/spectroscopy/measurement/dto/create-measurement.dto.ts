import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateMeasurementDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}

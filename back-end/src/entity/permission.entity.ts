import {Column, Entity, PrimaryGeneratedColumn} from "typeorm/browser";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}

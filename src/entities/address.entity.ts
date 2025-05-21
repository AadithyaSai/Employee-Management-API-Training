import { Column, Entity } from "typeorm";
import AbstractEntity from "./abstract.entity";

@Entity()
export default class Address extends AbstractEntity {
  @Column()
  line1: string;

  @Column()
  pincode: number;
}

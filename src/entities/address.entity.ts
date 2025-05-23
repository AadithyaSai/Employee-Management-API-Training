import { Column, Entity, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
export default class Address extends AbstractEntity {
  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column()
  houseNo: string;

  @Column()
  pincode: number;

  @OneToOne(() => Employee)
  employee: Employee;
}

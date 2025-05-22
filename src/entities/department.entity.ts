import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Employee from "./employee.entity";

@Entity()
export default class Department extends AbstractEntity {
  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employee: Employee;
}

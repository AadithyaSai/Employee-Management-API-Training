import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRoleEnum {
  UI = "UI",
  UX = "UX",
  Developer = "Developer",
  HR = "HR",
}

@Entity()
class Employee extends AbstractEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({
    type: "enum",
    enum: EmployeeRoleEnum,
    default: EmployeeRoleEnum.Developer,
  })
  roles: EmployeeRoleEnum;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Department, (department) => department.employee)
  department: Department;
}

export default Employee;

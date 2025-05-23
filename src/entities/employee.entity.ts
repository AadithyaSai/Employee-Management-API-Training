import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRoleEnum {
  UI = "UI",
  UX = "UX",
  DEVELOPER = "DEVELOPER",
  HR = "HR",
}

export enum EmployeeStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PROBATION = "PROBATION",
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
    default: EmployeeRoleEnum.DEVELOPER,
  })
  roles: EmployeeRoleEnum;

  @Column({
    type: "enum",
    enum: EmployeeStatusEnum,
    default: EmployeeStatusEnum.PROBATION,
  })
  status: EmployeeRoleEnum;

  @Column({
    default: "NOW()",
  })
  dateOfJoining: Date;

  @Column({})
  experience: number;

  @Column({
    unique: true,
  })
  employeeId: string;

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

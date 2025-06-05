import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRoleEnum {
  UI = "UI",
  UX = "UX",
  DEVELOPER = "DEVELOPER",
  HR = "HR",
  ADMIN = "ADMIN",
}

export enum EmployeeStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PROBATION = "PROBATION",
}

@Entity()
class Employee extends AbstractEntity {
  @Column()
  @Index("UQ_TITLE", ["title"], {
    unique: true,
    where: "(deleted_at IS NULL)",
  })
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
  role: EmployeeRoleEnum;

  @Column({
    type: "enum",
    enum: EmployeeStatusEnum,
    default: EmployeeStatusEnum.PROBATION,
  })
  status: EmployeeStatusEnum;

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

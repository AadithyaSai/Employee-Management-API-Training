import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import {
  EmployeeRoleEnum,
  EmployeeStatusEnum,
} from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEnum(EmployeeRoleEnum)
  roles: EmployeeRoleEnum;

  @IsOptional()
  @IsEnum(EmployeeStatusEnum)
  status: EmployeeStatusEnum;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsOptional()
  @IsDate()
  dateOfJoining: Date;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}

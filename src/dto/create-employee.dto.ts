import {
  IsDateString,
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
  role: EmployeeRoleEnum;

  @IsOptional()
  @IsEnum(EmployeeStatusEnum)
  status: EmployeeStatusEnum;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsOptional()
  @IsDateString()
  dateOfJoining: Date;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}

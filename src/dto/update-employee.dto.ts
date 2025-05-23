import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { UpdateAddressDto } from "./update-address.dto";
import { Type } from "class-transformer";
import {
  EmployeeRoleEnum,
  EmployeeStatusEnum,
} from "../entities/employee.entity";

export class UpdateEmployeeDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEnum(EmployeeRoleEnum)
  roles: EmployeeRoleEnum;

  @IsOptional()
  @IsEnum(EmployeeStatusEnum)
  status: EmployeeStatusEnum;

  @IsOptional()
  @IsString()
  employeeId: string;

  @IsOptional()
  @IsDate()
  dateOfJoining: Date;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDto)
  address?: UpdateAddressDto;
}

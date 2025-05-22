import { IsOptional, IsString } from "class-validator";

export default class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  name: string;
}

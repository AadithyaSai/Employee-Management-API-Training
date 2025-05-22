import { IsNotEmpty, IsString } from "class-validator";

export default class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  line1: string;

  @IsOptional()
  @IsNumber()
  pincode: number;
}

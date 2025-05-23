import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  line1: string;

  @IsOptional()
  @IsString()
  line2: string;

  @IsOptional()
  @IsString()
  houseNo: string;

  @IsOptional()
  @IsNumber()
  pincode: number;
}

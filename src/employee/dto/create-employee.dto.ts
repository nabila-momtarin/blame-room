import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsUUID()
  //   @IsNotEmpty()
  departmentId!: string;

  @IsUUID()
  @IsOptional()
  TLId!: string;
}

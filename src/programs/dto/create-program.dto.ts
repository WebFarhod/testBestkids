import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProgramInfo {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateProgramDto {
  @IsOptional()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  price: string;

  @ValidateNested()
  @Type(() => CreateProgramInfo)
  infos?: CreateProgramInfo[];
}

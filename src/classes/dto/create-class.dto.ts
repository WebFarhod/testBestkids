import {
  // IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassInfo {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class CreateClassDto {
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
  type: string;

  @IsOptional()
  @IsString()
  price: string;

  @ValidateNested()
  @Type(() => CreateClassInfo)
  infos?: CreateClassInfo[];

  @IsOptional()
  @IsString()
  teacher?: string;
}

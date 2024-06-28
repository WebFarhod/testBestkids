import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Socials {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  link?: string;
}
class Skills {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  percent?: string;
}

export class Info {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  percent?: string;
}

export class CreateTeacherDto {
  @IsOptional()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsString()
  rank: string;

  @IsString()
  description: string;

  @ValidateNested()
  @Type(() => Socials)
  socials?: Socials[];

  @ValidateNested()
  @Type(() => Skills)
  skills?: Skills[];

  @ValidateNested()
  @Type(() => Info)
  infos?: Info[];
}

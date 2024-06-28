import {
  // IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateNewsDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  body: string;
}

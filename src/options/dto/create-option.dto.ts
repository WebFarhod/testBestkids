import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOptionDto {
  
  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  image: string;
}

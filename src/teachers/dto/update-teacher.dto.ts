import { IsOptional, IsString } from 'class-validator';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends CreateTeacherDto {
  @IsOptional()
  @IsString()
  _id: string;
}

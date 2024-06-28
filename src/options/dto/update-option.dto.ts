import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsString } from 'class-validator';
// import { IsString } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @IsString()
  _id?: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  number: string;
  @IsNotEmpty()
  body: string;
}

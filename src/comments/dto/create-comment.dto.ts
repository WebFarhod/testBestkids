import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  user: string;
  @IsNotEmpty()
  number: string;
  @IsNotEmpty()
  body: string;
}

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Option & Document;

@Schema({ timestamps: true })
export class Option {
  @Prop()
  user: string;

  @Prop()
  body: string;

  @Prop()
  rating: number;

  @Prop()
  image: string;
}

export const OptionSchema = SchemaFactory.createForClass(Option);

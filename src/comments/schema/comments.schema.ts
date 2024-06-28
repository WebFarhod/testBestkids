import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { News } from 'src/news/schema/New.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  body: string;

  @Prop()
  user: string;

  @Prop()
  number: string;

  @Prop()
  isApproved: boolean;

  @Prop({ type: String, ref: 'News' })
  new: News | string;

  // createdAt: any
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

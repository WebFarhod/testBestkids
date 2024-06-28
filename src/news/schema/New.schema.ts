import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class News {
  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  body: string;

  // @Prop({ required: false, default: 0 })
  // comment?: number;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false, default: 0 })
  views?: number;
}
export const NewsSchema = SchemaFactory.createForClass(News);

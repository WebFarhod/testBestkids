import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class NewsType {
  @Prop({ required: true })
  title: string;
}
export const NewsTypeSchema = SchemaFactory.createForClass(NewsType);

/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  isUnRead: boolean;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  messageId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

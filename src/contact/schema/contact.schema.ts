import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  body: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

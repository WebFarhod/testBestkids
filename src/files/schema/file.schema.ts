// file.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop()
  filename: string;

  @Prop()
  path: string;

  @Prop()
  size: number;
}

export const FileSchema = SchemaFactory.createForClass(File);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class TeacherRank {
  @Prop({ required: true })
  title: string;
}

export const TeacherRankSchema = SchemaFactory.createForClass(TeacherRank);
export type TeacherRankDocument = HydratedDocument<TeacherRank>;

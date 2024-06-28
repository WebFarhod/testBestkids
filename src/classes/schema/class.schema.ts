// import { Prop, Schema } from '@nestjs/mongoose';

// @Schema()
// export class Class {
//   @Prop({ required: false })
//   image: string;

//   @Prop({ required: true })
//   name: string;

//   @Prop({ required: false })
//   description: string;

//   @Prop({ required: true })
//   about: string;

//   @Prop({ required: false })
//   type: string;

//   @Prop({ required: false })
//   teacher: string;
// }
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class ClassInfo {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  info?: string;
}

export const ClassInfoSchema = SchemaFactory.createForClass(ClassInfo);

@Schema()
export class ClassTeacher {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: false })
  image: string;
}

export const ClassTeacherSchema = SchemaFactory.createForClass(ClassTeacher);

@Schema()
export class Classes extends Document {
  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  teacher: string;

  // @Prop({ required: false })
  // price: string;

  // @Prop({ type: [ClassInfoSchema], required: false })
  // infos: ClassInfo[];

  // @Prop({ type: ClassTeacherSchema, required: false })
  // teacher: ClassTeacher;
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);

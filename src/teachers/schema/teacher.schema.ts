import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class TeacherSocials {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  link?: string;
}

class TeacherSkills {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  percent?: string;
}

class TeacherInfo {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  info?: string;
}

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  rank: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: TeacherSocials })
  socials: TeacherSocials[];

  @Prop({
    type: [{ type: TeacherSkills }],
  })
  skills: TeacherSkills[];

  @Prop({
    type: [{ type: TeacherInfo }],
  })
  infos: TeacherInfo[];
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);

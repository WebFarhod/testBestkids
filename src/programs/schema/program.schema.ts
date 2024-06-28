import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class ProgramInfo {
  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  image?: string;
}
@Schema()
export class Programs {
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
  price: string;

  @Prop({ type: ProgramInfo })
  infos: ProgramInfo[];
}
export const ProgramSchema = SchemaFactory.createForClass(Programs);

import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Classes, ClassesSchema } from './schema/class.schema';
import { ProgramSchema, Programs } from 'src/programs/schema/program.schema';
import { Teacher, TeacherSchema } from 'src/teachers/schema/teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Classes.name,
        schema: ClassesSchema,
      },
      {
        name: Programs.name,
        schema: ProgramSchema,
      },
      {
        name: Teacher.name,
        schema: TeacherSchema,
      },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}

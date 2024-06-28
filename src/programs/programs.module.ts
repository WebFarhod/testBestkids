import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramSchema, Programs } from './schema/program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Programs.name,
        schema: ProgramSchema,
      },
    ]),
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService],
})
export class ProgramsModule {}

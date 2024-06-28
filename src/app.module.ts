import { Module } from '@nestjs/common';
import { ClassesModule } from './classes/classes.module';
import { ProgramsModule } from './programs/programs.module';
import { TeachersModule } from './teachers/teachers.module';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { ContactModule } from './contact/contact.module';
import { CommentsModule } from './comments/comments.module';
import { MessageModule } from './message/message.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    TeachersModule,
    ClassesModule,
    ProgramsModule,
    NewsModule,
    FilesModule,
    UsersModule,
    ContactModule,
    CommentsModule,
    MessageModule,
    OptionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

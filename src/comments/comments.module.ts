import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comments.schema';
import { News, NewsSchema } from 'src/news/schema/New.schema';
import { Message, MessageSchema } from 'src/message/schema/message.schema';
import { CommentsService } from './comments.service';
import { NewsService } from 'src/news/news.service';
import {
  NewsType,
  NewsTypeSchema,
} from 'src/schemas/new.type.schema/NewType.schema';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: News.name, schema: NewsSchema },
      { name: NewsType.name, schema: NewsTypeSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, NewsService, MessageService],
})
export class CommentsModule {}

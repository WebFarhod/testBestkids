import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { News, NewsSchema }
import {
  NewsType,
  NewsTypeSchema,
} from 'src/schemas/new.type.schema/NewType.schema';
import { News, NewsSchema } from './schema/New.schema';
import { Comment, CommentSchema } from 'src/comments/schema/comments.schema';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: News.name,
        schema: NewsSchema,
      },
      {
        name: NewsType.name,
        schema: NewsTypeSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService, CommentsService],
})
export class NewsModule {}

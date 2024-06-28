import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { NewsService } from 'src/news/news.service';
import { MessageService } from 'src/message/message.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly messageService: MessageService,
    private readonly newsService: NewsService,
  ) {}

  @Post(':id')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') id: string,
  ) {
    try {
      const news = await this.newsService.findOne(id);
      if (!news) throw new NotFoundException(`no news with this _id = ${id}`);
      const data = await this.commentsService.createComment(
        createCommentDto,
        id,
      );
      await this.messageService.create({
        user: createCommentDto.user,
        type: 'comment',
        title: 'Izoh',
        dataId: data._id.toString(),
      });
      return data;
    } catch (error) {
      throw new NotFoundException(`Something went wrong`);
    }
    // return this.commentsService.create(createCommentDto);
  }

  // @Post()
  // async createComment(@Body() commentData: CreateCommentDto) {
  //   let data: any;
  //   commentData.user = req.user._id;

  //   data = await this.articlesService.getArticleById(commentData.article);
  //   if (!data)
  //     throw new NotFoundException(
  //       `no articles with this _id = ${commentData.article}`,
  //     );

  //   data = await this.commentService.createComment(commentData);
  //   if (data.affected === 0)
  //     throw new BadRequestException(
  //       `can't create comment on this articles with this _id = ${commentData.article}`,
  //     );

  //   // to remove __v from object before retune data to user
  //   data = (data as any).toObject();
  //   delete data['__v'];
  //   delete data['createdAt'];
  //   delete data['updatedAt'];

  //   return { data };
  // }

  @Get('bynewid/:id')
  findAll(@Param('id') id: string) {
    return this.commentsService.findAllById(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Get('approved/:id')
  approved(@Param('id') id: string) {
    return this.commentsService.approved(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}

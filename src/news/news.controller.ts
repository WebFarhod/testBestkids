import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CommentsService } from 'src/comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get('/type')
  findAllType() {
    return this.newsService.findAllType();
  }
  @Post('type')
  createNewSType(@Body() data: { title: string }) {
    return this.newsService.createNewType(data);
  }
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentsService.findAllById(id);
    const newData = await this.newsService.findOne(id);
    const data = {
      data: newData,
      comment: comment.length,
    };
    return data;
  }
  @Get('view/:id')
  viewNew(@Param('id') id: string) {
    return this.newsService.viewNew(id);
  }
  @Put()
  update(@Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}

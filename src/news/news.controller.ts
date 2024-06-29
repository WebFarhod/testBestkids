import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { CommentsService } from 'src/comments/comments.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  update(@Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(updateNewsDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}

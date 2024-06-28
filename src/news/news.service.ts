/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
// import { News } from 'src/schemas/new.schema/New.schema';
import { NewsType } from 'src/schemas/new.type.schema/NewType.schema';
import { Model } from 'mongoose';
import { NewResponseType, SortNews } from './types/newResponse.type';
import { News } from './schema/New.schema';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name) private newModel: Model<News>,
    @InjectModel(NewsType.name) private newTypeModel: Model<NewsType>,
  ) {}
  findAll() {
    const data = this.newModel.find().sort({ createdAt: -1 }).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }
  async create(data: CreateNewsDto): Promise<News> {
    const newData: News = {
      ...data,
      author: 'John',
      // comment: 0,
      // views: 0,
    };
    const newUser = new this.newModel(newData);
    return await newUser.save();
  }

  findOne(id: string) {
    const data = this.newModel.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }

    return data;
  }

  async update(data: UpdateNewsDto) {
    const newData = await this.newModel.findById(data._id);
    if (!newData) {
      throw new NotFoundException(`Data not found`);
    }
    newData.image = data.image;
    newData.title = data.title;
    newData.type = data.type;
    newData.body = data.body;

    return newData.save();
  }
  async viewNew(id: string) {
    const newData = await this.newModel.findById(id);
    if (!newData) {
      throw new NotFoundException(`Data not found`);
    }
    newData.views = newData.views + 1;

    return newData.save();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} news`;
  // }

  async remove(id: string) {
    const data = await this.newModel.findByIdAndDelete(id).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  async createNewType(data: { title: string }) {
    const newType = new this.newTypeModel(data);
    return await newType.save();
  }
  async findAllType() {
    const data = await this.newTypeModel.find();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }
}

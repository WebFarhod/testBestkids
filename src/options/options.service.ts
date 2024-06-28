import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Option } from './schema/potions.schema';

@Injectable()
export class OptionsService {
  constructor(@InjectModel(Option.name) private optionModel: Model<Option>) {}
  async create(createOptionDto: CreateOptionDto) {
    return await this.optionModel.create(createOptionDto);
  }

  async findAll() {
    return await this.optionModel.find().exec();
  }

  async findOne(id: string) {
    const data = await this.optionModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  async update(data: UpdateOptionDto) {
    const tData = await this.optionModel.findById(data._id).exec();
    if (!tData) {
      throw new NotFoundException(`Data not found`);
    }
    tData.user = data.user;
    tData.image = data.image;
    tData.body = data.body;
    tData.rating = data.rating;
    return tData.save();
  }

  async remove(id: string) {
    const data = await this.optionModel.findByIdAndDelete(id).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }
}

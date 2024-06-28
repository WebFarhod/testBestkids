import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Programs } from './schema/program.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectModel(Programs.name) private programModel: Model<Programs>,
  ) {}

  async create(data: CreateProgramDto) {
    const newProgram = new this.programModel({ ...data, type: data.name });
    return await newProgram.save();
  }

  async update(data: UpdateProgramDto) {
    const tData = await this.programModel.findById(data._id).exec();
    if (!tData) {
      throw new NotFoundException(`Data not found`);
    }

    tData.image = data.image;
    tData.name = data.name;
    tData.description = data.description;
    tData.about = data.about;
    tData.type = data.name;
    tData.price = data.price;
    tData.infos = data.infos;
    return tData.save();
  }

  findAll() {
    const data = this.programModel.find().populate(['infos']).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  findOne(id: string) {
    const data = this.programModel.findById(id).populate(['infos']);
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  async remove(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.programModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    try {
      const deletedCount = await this.programModel.deleteMany({
        _id: { $in: id },
      });

      if (deletedCount.deletedCount === 0) {
        console.warn('No programs found with the provided IDs');
        throw new NotFoundException(`No programs found with the provided IDs`);
      } else {
        console.log(
          `${deletedCount.deletedCount} programs deleted successfully`,
        );

        throw new NotFoundException(
          `${deletedCount.deletedCount} programs deleted successfully`,
        );
      }
    } catch (error) {
      console.error('Error deleting programs:', error);
      throw error;
    }
  }
}

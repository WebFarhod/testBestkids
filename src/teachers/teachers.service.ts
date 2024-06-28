import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schema/teacher.schema';
import { Model } from 'mongoose';
import { TeacherRank } from './schema/teacher-rank.schema';
import { SELECT } from 'src/utilities/common';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
// import { TeacherInfos } from './schema/teacher-info.schema';
// import { TeacherSkills } from './schema/teacher-skills.schema';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    @InjectModel(TeacherRank.name) private rankModal: Model<File>,
  ) {}
  async create(data: CreateTeacherDto) {
    const newUser = new this.teacherModel(data);
    return await newUser.save();
  }

  async findAll() {
    const data = await this.teacherModel
      .find()
      .populate(['socials', 'skills', 'infos'])
      .select(SELECT)
      .exec();
    return data;
  }

  async findOne(id: number) {
    const data = await this.teacherModel
      .findById(id)
      .populate(['socials', 'skills', 'infos'])
      .select(SELECT)
      .exec();
    return data;
  }

  async update(id: string, data: UpdateTeacherDto) {
    const teacher = await this.teacherModel.findByIdAndUpdate(id, data, {
      new: true,
      useFindAndModify: false,
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return teacher;
  }

  async remove(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.teacherModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    const deletedCount = await this.teacherModel.deleteMany({
      _id: { $in: id },
    });

    if (deletedCount.deletedCount === 0) {
      console.warn('No teachers found with the provided IDs');
      throw new NotFoundException(`No teachers found with the provided IDs`);
    } else {
      console.log(`${deletedCount.deletedCount} teachers deleted successfully`);
    }
  }

  async createRank(data: { title: string }) {
    const newType = new this.rankModal(data);
    return await newType.save();
  }

  async findAllRank() {
    return await this.rankModal.find().select(SELECT).exec();
  }
}

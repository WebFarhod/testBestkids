// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class ClassesService {
//   create(createClassDto) {
//     return 'This action adds a new class';
//   }

//   findAll() {
//     return `This action returns all classes`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} class`;
//   }

//   update(id: number, updateClassDto) {
//     return `This action updates a #${id} class`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} class`;
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as fs from 'fs';
import { CreateClassDto } from './dto/create-class.dto';
import { Classes } from './schema/class.schema';
import { UpdateClassDto } from './dto/update-class.dto';
import { Programs } from 'src/programs/schema/program.schema';
// import { ClassResponseType } from './types/classResponse.type';
import { Teacher } from 'src/teachers/schema/teacher.schema';
import { ClassResponseType } from './types/classResponse.type';
@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Classes.name) private classModel: Model<Classes>,
    // @InjectModel(File.name) private fileModel: Model<File>,
    @InjectModel(Programs.name) private programModel: Model<Programs>,
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  async createClass(data: CreateClassDto) {
    // const program = await this.programModel.findOne({ name: data.type });
    // console.log(program.infos, 'test');
    // const teacherData = await this.teacherModel.findById(data.teacher).exec();

    // {
    //   ...data,
    //   infos: program.infos,
    //   price: program.price,
    //   teacher: teacherData
    //     ? {
    //         _id: teacherData._id.toString(),
    //         name: teacherData.name,
    //         surname: teacherData.surname,
    //         image: teacherData.image,
    //       }
    //     : null,
    // }
    const newClass = new this.classModel(data);
    const res = await newClass.save();
    console.log(res);
    return res;
  }

  async updateClass(data: UpdateClassDto) {
    const tData = await this.classModel.findById(data._id);
    if (!tData) {
      throw new NotFoundException(`Data not found`);
    }
    tData.image = data.image;
    tData.name = data.name;
    tData.description = data.description;
    tData.about = data.about;
    tData.type = data.type;
    tData.teacher = data.teacher;

    return tData.save();
  }

  // async uploadFile(@UploadedFile() file): Promise<string> {
  //   const { originalname, path, size } = file;
  //   const newFile = new this.fileModel({ filename: originalname, path, size });
  //   const savedFile = await newFile.save();
  //   return savedFile._id;
  // }

  // async updateFile(@UploadedFile() file, id: string): Promise<string> {
  //   try {
  //     const fData = await this.fileModel.findByIdAndDelete(id).exec();
  //     fs.unlinkSync(fData.path);
  //     const { originalname, path, size } = file;
  //     const newFile = new this.fileModel({
  //       filename: originalname,
  //       path,
  //       size,
  //     });
  //     const savedFile = await newFile.save();
  //     return savedFile._id;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  async findAll(): Promise<ClassResponseType[]> {
    const data = this.classModel.find().exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }

    const response: ClassResponseType[] = await Promise.all(
      (await data).map(async (doc) => {
        const program = await this.programModel.findById(doc.type).exec();
        const teacher = await this.teacherModel.findById(doc.teacher).exec();

        return {
          _id: doc._id.toString(),
          image: doc.image,
          name: doc.name,
          description: doc.description,
          about: doc.about,
          type: doc.type,
          price: program ? program.price : null,
          infos: program ? program.infos : null,
          teacher: teacher
            ? {
                _id: teacher._id.toString(),
                name: teacher.name,
                surname: teacher.surname,
                image: teacher.image,
              }
            : null,
        };
      }),
    );

    return response;
  }

  // async getFile(id: string): Promise<File> {
  //   return this.fileModel.findById(id).exec();
  // }

  findOne(id: string) {
    const data = this.classModel.findById(id);
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    return data;
  }

  // async findOne(id: string): Promise<ClassResponseType> {
  //   try {
  //     // Fetch class data by ID
  //     const data = await this.classModel.findById(id).exec();

  //     // If class data is not found, throw a NotFoundException
  //     if (!data) {
  //       throw new NotFoundException(`Data not found`);
  //     }

  //     // Fetch teacher data if teacher ID exists
  //     let teacherData = null;
  //     if (data.teacher) {
  //       try {
  //         teacherData = await this.teacherModel.findById(data.teacher).exec();
  //       } catch (error) {
  //         if (error.name === 'CastError') {
  //           throw new NotFoundException(`Invalid teacher ID format`);
  //         }
  //         throw error;
  //       }
  //     }

  //     // Construct the response object
  //     const response: ClassResponseType = {
  //       _id: data._id.toString(),
  //       image: data.image,
  //       name: data.name,
  //       description: data.description,
  //       about: data.about,
  //       type: data.type,
  //       price: data.price,
  //       infos: data.infos,
  //       teacher: teacherData
  //         ? {
  //             _id: teacherData._id.toString(),
  //             name: teacherData.name,
  //             surname: teacherData.surname,
  //             image: teacherData.image,
  //           }
  //         : null,
  //     };

  //     return response;
  //   } catch (error) {
  //     if (error.name === 'CastError') {
  //       throw new NotFoundException(`Invalid class ID format`);
  //     }
  //     throw error;
  //   }
  // }

  async deleteClass(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.classModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    try {
      const deletedCount = await this.classModel.deleteMany({
        _id: { $in: id },
      });

      if (deletedCount.deletedCount === 0) {
        console.warn('No classs found with the provided IDs');
        throw new NotFoundException(`No classs found with the provided IDs`);
      } else {
        console.log(`${deletedCount.deletedCount} classs deleted successfully`);

        throw new NotFoundException(
          `${deletedCount.deletedCount} classs deleted successfully`,
        );
      }
    } catch (error) {
      console.error('Error deleting classs:', error);
      throw error;
    }
  }

  // async deleteFile(id: string): Promise<boolean> {
  //   const file = await this.fileModel.findById(id);
  //   if (!file) {
  //     return false;
  //   }
  //   try {
  //     fs.unlinkSync(file.path);
  //     await this.fileModel.findByIdAndDelete(id);
  //     return true;
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //     return false;
  //   }
  // }
}

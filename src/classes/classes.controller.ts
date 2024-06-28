// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { ClassesService } from './classes.service';
// // import { ClassDto } from './dto/class.dto';

// @Controller('classes')
// export class ClassesController {
//   constructor(private readonly classesService: ClassesService) {}

//   @Post()
//   create(@Body() createClassDto) {
//     return this.classesService.create(createClassDto);
//   }

//   @Get()
//   findAll() {
//     return this.classesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.classesService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateClassDto) {
//     return this.classesService.update(+id, updateClassDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.classesService.remove(+id);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  // UseInterceptors,
  // Res,
  // UploadedFile,
  Put,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { Response } from 'express';
// import * as path from 'path';
import { ClassResponseType } from './types/classResponse.type';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  createClass(@Body() data: CreateClassDto) {
    return this.classesService.createClass(data);
  }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadFile(@UploadedFile() file): Promise<any> {
  //   return this.classesService.uploadFile(file);
  // }

  @Put()
  updateClass(@Body() data: UpdateClassDto) {
    return this.classesService.updateClass(data);
  }

  @Get()
  findAll(): Promise<ClassResponseType[]> {
    return this.classesService.findAll();
  }

  // @Get('file/:id')
  // async getFile(@Param('id') id: string, @Res() res: Response): Promise<any> {
  //   const file = await this.classesService.getFile(id);
  //   if (!file) {
  //     return res.status(404).send({ message: 'File not found' });
  //   }
  //   res.type('image/jpeg');
  //   const absolutePath = path.resolve(file.path);
  //   if (absolutePath) {
  //     res.sendFile(absolutePath);
  //   } else {
  //     return res.status(404).send({ message: 'File not found' });
  //   }
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const teacher = this.classesService.findOne(id);
    return teacher;
  }
  ////////////
  @Delete()
  deleteTeacher(@Body() data) {
    return this.classesService.deleteClass(data.id);
  }

  // @Delete('file/:id')
  // async deleteFile(@Param('id') id: string): Promise<any> {
  //   const success = await this.classesService.deleteFile(id);
  //   if (success) {
  //     return { message: 'File deleted successfully' };
  //   } else {
  //     return { message: 'File not found or error deleting file' };
  //   }
  // }
}

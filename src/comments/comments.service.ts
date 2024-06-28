import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comments.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  // create(createCommentDto: CreateCommentDto) {
  //   return 'This action adds a new comment';
  // }
  async createComment(createCommentDto: CreateCommentDto, id: string) {
    return await this.commentModel.create({
      body: createCommentDto.body,
      user: createCommentDto.user,
      number: createCommentDto.number,
      isApproved: false,
      new: id,
    });
  }

  async findAllById(id: string) {
    const data = await this.commentModel.find({ new: id });
    const v = data.filter((comment) => comment.isApproved == true);
    return v;
    // return await this.commentModel
    //   .findOne({ new }).filter((comment) => comment.isApproved == true)
    // .populate({ path: 'new', select: `${SELECT} -user` });
    // .select(SELECT);

    // const data = await this.commentModel.find();
    // const comments = data
    //   .filter((comment) => comment.isApproved == true)
    //   .map((item) => {
    //     return item.messageId.toString();
    //   });
    // return await this.commentModel.find();
  }

  async findOne(id: string) {
    return await this.commentModel.findById(id);
  }

  async approved(id: string) {
    const data = await this.commentModel.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    data.isApproved = true;
    return data.save();
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageType } from './types/message.type';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(message: MessageType): Promise<Message> {
    return this.messageModel.create({
      isUnRead: true,
      title: message.title,
      type: message.type,
      user: message.user,
      messageId: message.dataId,
    });
  }

  async findAll() {
    return await this.messageModel.find();
  }

  async findByIds(ids: string[]) {
    const message = await this.messageModel
      .find({
        _id: { $in: ids },
      })
      .exec();

    if (message.length === 0) {
      throw new NotFoundException(`No message found with the provided IDs`);
    }

    return message;
  }

  async readAll() {
    try {
      return await this.messageModel.updateMany(
        {},
        { $set: { isUnRead: false } },
      );
    } catch (error) {
      console.error('Error occurred:', error);
      throw new Error('Failed to fetch message');
    }
  }

  async readMessage(id: string) {
    const data = await this.messageModel.findById(id).exec();
    if (!data) {
      throw new NotFoundException(`Data not found`);
    }
    data.isUnRead = false;
    return data.save();
  }

  async remove(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.messageModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    try {
      const deletedCount = await this.messageModel.deleteMany({
        _id: { $in: id },
      });

      if (deletedCount.deletedCount === 0) {
        console.warn('No messages found with the provided IDs');
        throw new NotFoundException(`No teachers found with the provided IDs`);
      } else {
        console.log(
          `${deletedCount.deletedCount} messages deleted successfully`,
        );
      }
    } catch (error) {
      console.error('Error deleting messages:', error);
      throw error;
    }
  }
}

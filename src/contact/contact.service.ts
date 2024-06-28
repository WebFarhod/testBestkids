import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schema/contact.schema';
import { Model } from 'mongoose';
// import { ContactType } from './types/contact.type';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async createContact(createContactDto: CreateContactDto) {
    return await this.contactModel.create(createContactDto);
  }

  async findAll() {
    return await this.contactModel.find();
  }

  async findOne(id: string) {
    return await this.contactModel.findById(id);
  }

  async remove(id: string[] | string) {
    if (!Array.isArray(id)) {
      const data = await this.contactModel.findByIdAndDelete(id).exec();
      if (!data) {
        throw new NotFoundException(`Data not found`);
      }
      return data;
    }

    try {
      const deletedCount = await this.contactModel.deleteMany({
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

  async findByIds(ids: string[]) {
    const contacts = await this.contactModel
      .find({
        _id: { $in: ids },
      })
      .exec();

    if (contacts.length === 0) {
      throw new NotFoundException(`No contacts found with the provided IDs`);
    }

    return contacts;
  }
}

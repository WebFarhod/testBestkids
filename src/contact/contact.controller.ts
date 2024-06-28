import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { MessageService } from 'src/message/message.service';
// import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly messageService: MessageService,
  ) {}

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    try {
      const data = await this.contactService.createContact(createContactDto);
      await this.messageService.create({
        user: createContactDto.user,
        type: 'proposition',
        title: 'Fikr va takliflar',
        dataId: data._id.toString(),
      });
      return data;
    } catch (error) {
      throw new NotFoundException(`Something went wrong`);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }
}

import { Controller, Get, Body, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { ContactService } from 'src/contact/contact.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get('/readAll')
  readAll() {
    return this.messageService.readAll();
  }

  @Get('/read/:id')
  readMessage(@Param('id') id: string) {
    return this.messageService.readMessage(id);
  }

  @Delete()
  async remove(@Body() data) {
    const messageData = await this.messageService.findByIds(data.id);

    const contactIdArr: string[] = messageData
      .filter((item) => item.type == 'proposition')
      .map((item) => {
        return item.messageId.toString();
      });
    await this.contactService.remove(contactIdArr);
    return this.messageService.remove(data.id);
  }
}

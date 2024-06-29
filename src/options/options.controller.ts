import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  update(@Body() updateOptionDto: UpdateOptionDto) {
    // console.log('a', updateOptionDto);

    return this.optionsService.update(updateOptionDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }
}

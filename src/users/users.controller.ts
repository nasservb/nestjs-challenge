import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserAvatarDto } from './dto/get-user-avatar.dto';
import { RemoveUserAvatarDto } from './dto/remove-user-avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id/avatar')
  async findByAvatar(
    @Query() getUserAvatarDto: GetUserAvatarDto,
  ): Promise<any> {
    return this.usersService.findByAvatar(
      getUserAvatarDto.id,
      getUserAvatarDto.avatar,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id/avatar')
  remove(@Query() removeUserAvatarDto: RemoveUserAvatarDto) {
    return this.usersService.remove(
      removeUserAvatarDto.id,
      removeUserAvatarDto.avatar,
    );
  }
}

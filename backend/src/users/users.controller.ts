import { Controller, Get, Query, Headers, Post, Body } from '@nestjs/common';
import { AddTagDto } from './dto/add-tag.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/login')
  async login(@Query('code') code: string) {
    return await this.usersService.login(code);
    
  }

  @Get('/starred')
  async findStarred(@Headers('Authorization') sessionId: string = "", @Query('user') user, @Query('filter') filter) {
    return this.usersService.findStarred(user, filter, sessionId);
  }

  @Post('/tag/add')
  async addTag(@Headers('Authorization') sessionId: string = "", @Body() data: AddTagDto) {
    const { name, key, tag } = data;
    return this.usersService.addTag(name, key, tag, sessionId)
  }

  @Post('/tag/privacy')
  async switchPrivacy(@Headers('Authorization') sessionId: string = "") {
    return await this.usersService.switchPrivacy(sessionId);
  }

  @Get('/tag/privacy')
  async getPrivacy(@Headers('Authorization') sessionId: string = "") {
    return await this.usersService.getPrivacy(sessionId);
  }

}

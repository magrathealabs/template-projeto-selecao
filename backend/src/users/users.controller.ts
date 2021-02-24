import { Controller, Get, Query, Headers, Post, Body } from '@nestjs/common';
import { AddTagDto } from './dto/add-tag.dto';
import { EditTagDto } from './dto/edit-tag.dto';
import { UsersService } from './users.service';
import { DeleteTagDto } from './dto/delete-tag.dto';

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

  @Post('/tag/edit')
  async editTag(@Headers('Authorization') sessionId: string = "", @Body() data: EditTagDto) {
    const { name, key, oldTag, newTag } = data;
    return this.usersService.editTag(name, key, oldTag, newTag, sessionId);
  }

  @Post('/tag/delete')
  async deleteTag(@Headers('Authorization') sessionId: string = "", @Body() data: DeleteTagDto) {
    const { name, key, oldTag } = data;
    return this.usersService.deleteTag(name, key, oldTag, sessionId);
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

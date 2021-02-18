import { Controller, Get, Query, HttpStatus, Res, Headers, Post, Body } from '@nestjs/common';
import { AddTagDto } from './dto/add-tag.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/login')
  async login(@Query('code') code: string, @Res() res) {
    const out = await this.usersService.login(code);
    if (out === null) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 'Error': 'Internal Error' });
    }
    return res.status(HttpStatus.OK).json(out);
  }

  @Get('/starred')
  async findStarred(@Headers('Authorization') sessionId: string = "", @Query('user') user, @Query('filter') filter) {
    return this.usersService.findStarred(user, filter, sessionId);
  }

  @Post('/tag/add')
  async addTag(@Headers('Authorization') sessionId: string = "", @Body() data: AddTagDto, @Res() res) {
    const { name, key, tag } = data;
    const done = await this.usersService.addTag(name, key, tag, sessionId)
      .then(() => res.status(HttpStatus.OK).json({ 'ok': 1 }))
      .catch((err: Error) => res.status(HttpStatus.UNAUTHORIZED).json({ Error: err.name }));
    return done;
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

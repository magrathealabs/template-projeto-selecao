import { Controller, Get, Query, HttpException, HttpStatus, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/login')
  async login(@Query('code') code: string, @Res() res: Response) {
    const out = await this.usersService.login(code);
    if (out === null) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({'Error': 'Internal Error'});
    }
    return res.status(HttpStatus.OK).json(out);
  }

  @Get('/starred')
  async findStarred(@Query('user') user) {
    return this.usersService.findStarred(user);
  }

}

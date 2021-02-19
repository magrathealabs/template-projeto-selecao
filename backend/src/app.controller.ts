import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  Index(@Res() res: Response) {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
  }
}

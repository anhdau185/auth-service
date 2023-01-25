import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  welcome() {} // eslint-disable-line @typescript-eslint/no-empty-function
}

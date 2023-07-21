import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('aurelius')
  getAureliusQuote(): string {
    return this.appService.getAureliusQuote();
  }

  @Get('seneca')
  getSenecaQuote(): string {
    return this.appService.getSenecaQuote();
  }

  @Get('epictetus-theenchiridion')
  getEpictetusTheEnchridionQuote(): string {
    return this.appService.getEpictetusTheEnchridionQuote();
  }

  @Get('epictetus-discourses')
  getEpictetusDiscoursesQuote(): string {
    return this.appService.getEpictetusDiscoursesQuote();
  }
}

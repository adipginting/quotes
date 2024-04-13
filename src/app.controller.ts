import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStoicQuote(@Query('min') min: number, @Query('max') max: number): string {
    let randomNumber: number = Math.floor(Math.random() * 4);
    switch (randomNumber) {
      case 0:
        return this.appService.getAureliusQuote();
      case 1:
        return this.appService.getSenecaQuote();
      case 2:
        return this.appService.getEpictetusTheEnchridionQuote();
      case 3:
        return this.appService.getEpictetusDiscoursesQuote();
    }
  }

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

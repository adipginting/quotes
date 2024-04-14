import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getStoicQuote(
    @Query('min') min?: number,
    @Query('max') max?: number,
  ): string {
    if ((min && min <= 100) || (max && max <= 100)) {
      throw new HttpException(
        'The requested quote must be more than 100 characters.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const getQuote = (
      philosopher: string,
      min?: number,
      max?: number,
    ): string => {
      const quote = this.appService.processQuote(philosopher, min, max);
      if (quote && quote.length > 100) {
        return quote;
      }
      throw new HttpException(
        'Please try again or change the request parameter',
        HttpStatus.EXPECTATION_FAILED,
      );
    };

    let randomNumber: number = Math.floor(Math.random() * 4);

    switch (randomNumber) {
      case 0:
        return getQuote('aurelius', min, max);
      case 1:
        return getQuote('seneca', min, max);
      case 2:
        return getQuote('epictetus-theenchiridion', min, max);
      case 3:
        return getQuote('epictetus-discourses', min, max);
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

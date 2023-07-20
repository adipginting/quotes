import { Injectable } from '@nestjs/common';
import { convert } from 'html-to-text';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getQuote(): string {
    function processQuote(): string {
      let randomBookNumber: number = Math.floor(Math.random() * 12);
      if (randomBookNumber === 0) {
        randomBookNumber = 1;
      }
      const html: string = fs.readFileSync(`marcus-aurelius_meditations_george-long/src/epub/text/book-${randomBookNumber}.xhtml`, 'utf8');
      let text: string = convert(html, { wordwrap: false });
      text = text.replace(/\[.*?\]/g, "");
      text = text.replace(/[0-9]/g, "");
      let textArray: Array<string> = text.split('.');
      const randomQuoteNumber: number = Math.floor(Math.random() * textArray.length);
      let quote: string = textArray[randomQuoteNumber];
      if (quote !== "" || quote !== undefined) {
        return quote + ".";
      } else {
        return processQuote();
      }
    }

    return processQuote();
  }

}

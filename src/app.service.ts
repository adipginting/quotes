import { Injectable } from '@nestjs/common';
import { convert } from 'html-to-text';
import { HTMLElement, parse } from 'node-html-parser';
import * as fs from 'fs';

@Injectable()
export class AppService {
  private quoteAndInfo(
    quote: string,
    philosopher: string,
    author: string,
    book: string,
    chapter?: string,
  ): string {
    if (chapter === undefined) {
      return '"' + quote + '"' + ' --' + `${author}, ${book}`;
    }
    return '"' + quote + '"' + ' --' + `${author}, ${book}, ${chapter}`;
  }

  private produceSentence(
    html: string,
    min?: number,
    max?: number,
    recursIndex?: number,
  ): string {
    if (recursIndex === 3) {
      return '';
    }

    const document = parse(html);
    const paragraphs: Array<HTMLElement> = document.querySelectorAll('p');
    const randomParagraphNumber: number = Math.floor(
      Math.random() * paragraphs.length,
    );
    let paragraph = paragraphs[randomParagraphNumber].textContent;
    paragraph = convert(paragraph, { wordwrap: false });
    paragraph = paragraph.replace(/\[.*?\]/g, '');
    paragraph = paragraph.replace(/[0-9]/g, '');
    paragraph = paragraph.replace('\n', '');
    const sentenceArray: Array<string> = paragraph.split('.');
    const randomSentenceNumber: number = Math.floor(
      Math.random() * sentenceArray.length,
    );
    let sentence: string = sentenceArray[randomSentenceNumber];

    if (/\!$|\?$/.test(sentence) === false) {
      sentence = sentence + '.';
    }

    sentence = sentence.replace(/^\s*/, '');

    if (min) {
      return sentence.length > 100 && sentence.length >= min
        ? sentence
        : this.produceSentence(html, min, undefined, recursIndex + 1);
    }

    if (max) {
      return sentence.length > 100 && sentence.length <= max
        ? sentence
        : this.produceSentence(html, undefined, max, recursIndex + 1);
    }

    return sentence.length >= 100
      ? sentence
      : this.produceSentence(html, undefined, undefined, recursIndex + 1);
  }

  processQuote(philosopher: string, min?: number, max?: number): string {
    let randomBookNumber: number = 0;
    let html: string = '';
    let quote: string = '';
    switch (philosopher) {
      case 'aurelius':
        randomBookNumber = Math.floor(Math.random() * 12);
        if (randomBookNumber === 0) {
          randomBookNumber = 1;
        }
        html = fs.readFileSync(
          `marcus-aurelius_meditations_george-long/src/epub/text/book-${randomBookNumber}.xhtml`,
          'utf8',
        );
        quote = this.produceSentence(html, min, max);
        return this.quoteAndInfo(
          quote,
          philosopher,
          'Marcus Aurelius',
          'Meditations',
          `Book ${randomBookNumber}`,
        );
      case 'seneca':
        const dir: string = 'seneca_dialogues_aubrey-stewart/src/epub/text';
        const files: Array<string> = fs.readdirSync(dir);
        let bookFiles: Array<string> = [];

        for (let i: number = 0; i < files.length; i++) {
          if (files[i].includes('on-') || files[i].includes('to-'))
            bookFiles.push(files[i]);
        }

        randomBookNumber = Math.floor(Math.random() * bookFiles.length);
        html = fs.readFileSync(
          dir + '/' + `${bookFiles[randomBookNumber]}`,
          'utf8',
        );
        quote = this.produceSentence(html, min, max);
        let chapter: string = `${bookFiles[randomBookNumber]}`.replace(
          /[-]/g,
          ' ',
        );
        chapter = chapter.replace(/.xhtml/, ''); //remove file extension from chapter name
        const chapterArray: Array<string> = chapter.split(' ');
        chapter = chapterArray.reduce(
          (chapterWords: string, chapterWord: string) => {
            return (
              chapterWords[0].toUpperCase() +
              chapterWords.slice(1) +
              ' ' +
              chapterWord[0].toUpperCase() +
              chapterWord.slice(1)
            );
          },
        ); //capitalize chapter name
        return this.quoteAndInfo(
          quote,
          philosopher,
          'Lucius Anneus Seneca',
          'Dialogues',
          `${chapter}`,
        );
      case 'epictetus-theechiridion':
        html = fs.readFileSync(
          'epictetus_short-works_george-long/src/epub/text/the-enchiridion.xhtml',
          'utf8',
        );
        quote = this.produceSentence(html, min, max);
        return this.quoteAndInfo(
          quote,
          philosopher,
          'Epictetus',
          'The Enchiridion',
        );
      case 'epictetus-discourses':
        randomBookNumber = Math.floor(Math.random() * 4);
        if (randomBookNumber === 0) {
          randomBookNumber = 1;
        }
        html = fs.readFileSync(
          `epictetus_discourses_george-long/src/epub/text/book-${randomBookNumber}.xhtml`,
          'utf8',
        );
        quote = this.produceSentence(html, min, max);
        return this.quoteAndInfo(
          quote,
          philosopher,
          'Epictetus',
          'Discourses',
          `Book ${randomBookNumber}`,
        );
    }
  }

  getAureliusQuote(min?: number, max?: number): string {
    return this.processQuote('aurelius', min, max);
  }

  getSenecaQuote(min?: number, max?: number): string {
    return this.processQuote('seneca', min, max);
  }

  getEpictetusTheEnchridionQuote(min?: number, max?: number): string {
    return this.processQuote('epictetus-theechiridion', min, max);
  }

  getEpictetusDiscoursesQuote(min?: number, max?: number): string {
    return this.processQuote('epictetus-discourses', min, max);
  }
}

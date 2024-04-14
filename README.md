## Description

[Stoic Quote API](https://github.com/adipginting/stoic-quote-api) is a program to produce Stoic Quotes from 4 classic Stoicism's books.
Read the [API documentation here](https://stoic-quote-api.onrender.com). At default, each API end point will produce a sentence which length is more than 200 characters. The length is deliberate so that the quote can be contextual.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Roadmap:
- [x] API end points which return a sentence string with the option to set the minimum sentence string length.
- [x] API end points which return a sentence string with the option to set the maximum sentence string length.
- [ ] API end points that return a string of a random paragraph.
- [ ] API end points which return a JSON object of sentence string with the option to set the minimum sentence string length.
- [ ] API end points which return a JSON object of sentence string with the option to set the maximum sentence string length.
- [ ] API end points that return a JSON object of a string of a random paragraph.
- [ ] API end points that return a JSON object of paragraph quote and a brief explanation from OpenAI's GPT 3.5.
- [ ] API end points that return a JSON object of paragraph quote and a brief explanation from OpenAI's GPT 3.5.

## Support

Stoic Quote API is powered by [NestJS](https://nestjs.com).


## License

Stoic Quote API is [MIT licensed](LICENSE). The quotes are in public domain.

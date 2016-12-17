# get-them-args
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/tiaanduplessis/get-them-args.svg?branch=master)](https://travis-ci.org/tiaanduplessis/get-them-args)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Parse argument options with ease

This is a small parser for argument options. Nothing fancy.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)


## Install

```sh
$ npm install --save get-them-args
```

```sh
$ yarn add get-them-args
```

## Usage
To use, provide arguments as argument:smirk:. For example, if the arguments provided are `--hello world --parse=all --no-drugs --make-friends -n 4 -t 5`, the function will return:
```js
{ unknown: [],
  hello: 'world',
  parse: 'all',
  drugs: false,
  'make-friends': true,
  n: '4',
  t: '5'
}

```
All unparsed arguments will end up in the `unknown` array.

```js
const getThemArgs = require('get-them-arg')
const arguments = process.argv.slice(2) // Array of arguments to process
const options = {} // Options to be passed. CURRENTLY NONE AVAILABLE

// $ node ./example.js --dir . --command foo
console.log(getThemArgs(process.argv.slice(2)))
// Will print out: { unknown: [], dir: '.', command: 'foo' }
```

## API

### arguments
Array of arguments to parse.

### Options
Currently no options available. Added for future additions.

## Contribute

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

Created with ♥ by [Tiaan](http://tiaanduplessis.co.za). Licensed under the MIT License.

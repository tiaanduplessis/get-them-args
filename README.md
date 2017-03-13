<div align="center">
  <img align="center" src="media/banner.png" alt="get-them-args">
  <br>
  <strong>Parse argument options with ease</strong>
  <br>
  <div align="center">
    <a href="https://github.com/feross/standard">
      <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
    </a>
    <a href="https://travis-ci.org/tiaanduplessis/get-them-args">
      <img src="https://img.shields.io/travis/tiaanduplessis/get-them-args/master.svg?style=flat-square" alt="Travis" />
    </a>
    <a href="https://github.com/RichardLitt/standard-readme)">
      <img src="https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square" alt="Standard Readme" />
    </a>
  </div>
</div>
<br>
<div align="center">
  Built with ❤︎ by <a href="http://tiaanduplessis.co.za">Tiaan du Plessis</a>
</div>

<h2>Table of Contents</h2>
<details>
  <summary>Table of Contents</summary>
  <li><a href="#install">Install</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#api">API</a></li>
  <li><a href="#contribute">Contribute</a></li>
  <li><a href="#license">License</a></li>
</details>

## Install

```sh
$ npm install --save get-them-args
```

```sh
$ yarn add get-them-args
```

## Usage
To use, provide arguments as argument :smirk:.

```js
const getThemArgs = require('get-them-arg')
const arguments = process.argv.slice(2) // Array of arguments to process
const options = {} // Options to be passed. CURRENTLY NONE AVAILABLE

// $ node ./example.js --dir . --command foo
console.log(getThemArgs(process.argv.slice(2)))
// Will print out: { unknown: [], dir: '.', command: 'foo' }
```

For example, if the arguments provided are `--hello world --parse=all --no-drugs --make-friends -n 4 -t 5`, the function will return:

```js
{ unknown: [],
  hello: 'world',
  parse: 'all',
  drugs: false,
  'make-friends': true,
  n: 4,
  t: 5
}

```

All unparsed arguments will end up in the `unknown` array. The following types of arguments are supported:

```sh
--key=value
--key value
--key # true
--no-key # false
-key=value
-key value
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

Licensed under the MIT License.

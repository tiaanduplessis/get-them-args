const parse = require('get-them-args')
const options = {} // Options to be passed. CURRENTLY NONE AVAILABLE

// $ node ./example.js --dir . --command foo
console.log(parse(process.argv.slice(2) ))
// { unknown: [], dir: '.', command: 'foo' }

console.log(parse(process.argv))
// { unknown: [], dir: '.', command: 'foo' }

console.log(parse())
// { unknown: [], dir: '.', command: 'foo' }

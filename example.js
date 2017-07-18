// Run $ node ./example.js {ALL ARGS HERE}

const parse = require('./')
console.log(parse(process.argv.slice(2)))
console.log(parse(process.argv))
console.log(parse())

'use strict'

/**
 * Properly parse the given array in regards to object strings
 * e.g. [ '--headers={Foo:', '5,', 'bar:', '6}' ] -> [ '--headers={"Foo": 5, "bar": 6}' ]
 * @param {Array} args
 */
function splitArgObjects (args) {
  const newArgs = []
  let index = 0

  while(index < args.length) {
    const arg = args[index]

    if (arg.indexOf('{') !== -1) {
      const temp = []

      while (args[index].indexOf('}') === -1) {
        temp.push(args[index])
        index++
      }
      temp.push(args[index])

      newArgs.push(temp.join(' ').replace(/([\w\d]+):/g, '"$1":'))
    } else {
      newArgs.push(arg)
    }

    index++
  }

  return newArgs
}

/**
 * Parse argument options
 */
module.exports = function (args = [], options = {}) {

  const newArgs = splitArgObjects(args)

  /**
   * Recursively parse args
   *
   * @param {Array} args
   * @param {Object} obj
   * @returns
   */
  function parseArgs (args, obj) {
    // Check if end reached
    if (!args.length) { return obj }

    const arg = args[0]

    // if statement match conditions:
    // 1. --key=value || -key=value
    // 2. --no-key
    // 3. --key value|nothing
    // else add to unknown arr
    if (/^(--|-).+=/.test(arg)) {
      const match = arg.match(/^(--|-)([^=]+)=([\s\S]*)$/)
      // Set key(match[2]) = value(match[3])
      obj[match[2]] = match[3]
    } else if (/^--no-.+/.test(arg)) {
      // Set key = true
      obj[arg.match(/^--no-(.+)/)[1]] = false
    } else if (/^(--|-).+/.test(arg)) {
      const key = arg.match(/^(--|-)(.+)/)[2]
      const next = args[1]

      // If next value exist and not prefixed with - or --
      if (next && !/^(-|--)/.test(next)) {
        obj[key] = next
        return parseArgs(args.slice(2), obj)
      } else {
        obj[key] = true
      }
    } else {
      obj.unknown.push(arg)
    }

    return parseArgs(args.slice(1), obj)
  }


  const parseResult = parseArgs(newArgs, {unknown: []})

  // Covert to proper type
  for(let prop in parseResult) {
    try {
      parseResult[prop] = JSON.parse(parseResult[prop])
    } catch (e) {
      continue
    }
  }

  return parseResult
}

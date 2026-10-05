const parse = require('./')

test('should parse all the args', () => {
  expect(parse(['--dir', '.', '--command', 'foo'])).toMatchObject({ unknown: [], dir: '.', command: 'foo' })
  expect(
    parse(['--hello', 'world', '--parse=all', '--no-drugs', '--make-friends', '-n', '4', '-t', '5'])
  ).toMatchObject({
    unknown: [],
    hello: 'world',
    parse: 'all',
    drugs: false,
    'make-friends': true,
    n: 4,
    t: 5
  })
  expect(parse(['--args', '{foo: 5, bar: 6}'])).toMatchObject({ unknown: [], args: { foo: '5', bar: '6' } })
})

test('should add unknown arguments to unknown array', () => {
  expect(parse(['for', 'reasons', 'unknown'])).toMatchObject({ unknown: ['for', 'reasons', 'unknown'] })
})

;['123', '0', '1.5', '1e3', 'true', 'false', 'null', '"hello"', '[]', '[1,2]', '{"key":1}', ''].forEach(arg => {
  test('should preserve the positional string ' + JSON.stringify(arg), () => {
    expect(parse([arg])).toEqual({ unknown: [arg] })
  })
})

test('should preserve multiple JSON-like positional strings', () => {
  expect(parse(['123', 'true', 'null', '[1,2]'])).toEqual({ unknown: ['123', 'true', 'null', '[1,2]'] })
  expect(parse(['[1', '2]'])).toEqual({ unknown: ['[1', '2]'] })
})

test('should preserve positional strings alongside typed options', () => {
  expect(parse(['123', '--count=4', '--verbose', '--no-color', 'null'])).toEqual({
    unknown: ['123', 'null'],
    count: 4,
    verbose: true,
    color: false
  })
})

test('should still convert named option values to their JSON types', () => {
  expect(parse(['--number=123', '--zero=0', '--yes=true', '--no=false', '--nil=null', '--array=[1,2]', '--text="hello"', '--empty='])).toEqual({
    unknown: [],
    number: 123,
    zero: 0,
    yes: true,
    no: false,
    nil: null,
    array: [1, 2],
    text: 'hello',
    empty: ''
  })
  expect(parse(['--number', '123', '--nil', 'null', '--array', '[1,2]'])).toEqual({
    unknown: [],
    number: 123,
    nil: null,
    array: [1, 2]
  })
})

test('should still convert an option named unknown', () => {
  expect(parse(['--unknown=123'])).toEqual({ unknown: 123 })
  expect(parse(['--unknown', 'null'])).toEqual({ unknown: null })
  expect(parse(['--unknown=[1,2]'])).toEqual({ unknown: [1, 2] })
  expect(parse(['--unknown'])).toEqual({ unknown: true })
  expect(parse(['--no-unknown'])).toEqual({ unknown: false })
})

test('should preserve existing option overwrite behavior', () => {
  expect(parse(['123', '--unknown=4'])).toEqual({ unknown: 4 })
  expect(parse(['--count=1', '--count=2'])).toEqual({ unknown: [], count: 2 })
})

test('should preserve empty and implicit argument handling', () => {
  const originalArgv = process.argv

  try {
    process.argv = ['node', 'example.js']
    expect(parse()).toEqual({ unknown: [] })
    expect(parse([])).toEqual({ unknown: [] })

    process.argv = ['node', 'example.js', '123']
    expect(parse()).toEqual({ unknown: ['123'] })
    expect(parse([])).toEqual({ unknown: ['123'] })
    expect(parse(process.argv)).toEqual({ unknown: ['123'] })
  } finally {
    process.argv = originalArgv
  }
})

test('should leave the input arguments and options unchanged', () => {
  const args = ['123', '--count=4']
  const options = { custom: true }

  expect(parse(args, options)).toEqual({ unknown: ['123'], count: 4 })
  expect(args).toEqual(['123', '--count=4'])
  expect(options).toEqual({ custom: true })
})

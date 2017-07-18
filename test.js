/* eslint-env jest */
'use strict'

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

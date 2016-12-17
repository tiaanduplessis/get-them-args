/* eslint-env mocha */
'use strict'

const assert = require('chai').assert
const parse = require('./index')

describe('Parse argument options', () => {
  it('should return a object', () => {
    assert.isObject(parse())
    assert.isObject(parse([]))
  })

  it('should parse all the args', () => {
    assert(parse([ '--dir', '.', '--command', 'foo' ]), { unknown: [], dir: '.', command: 'foo' })
    assert(parse([ '--hello',
      'world',
      '--parse=all',
      '--no-drugs',
      '--make-friends',
      '-n',
      '4',
      '-t',
      '5' ]), { unknown: [], hello: 'world', parse: 'all', drugs: false, 'make-friends': true, n: '4', t: '5' })
  })

  it('should add unknown arguments to unknown array', () => {
    assert(parse([ 'for', 'reasons', 'unknown' ]), { unknown: [ 'for', 'reasons', 'unknown' ] })
  })
})

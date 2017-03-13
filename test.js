/* eslint-env jest */
'use strict'

const assert = require('assert')
const parse = require('./index')

describe('Parse argument options', () => {
  it('should return a object', () => {
    expect(parse()).toMatchObject({})
    expect(parse([])).toMatchObject({})
  })

  it('should parse all the args', () => {
    expect(parse([ '--dir', '.', '--command', 'foo' ])).toMatchObject({ unknown: [], dir: '.', command: 'foo' })
    expect(parse([ '--hello',
      'world',
      '--parse=all',
      '--no-drugs',
      '--make-friends',
      '-n',
      '4',
      '-t',
      '5' ])).toMatchObject({ unknown: [], hello: 'world', parse: 'all', drugs: false, 'make-friends': true, n: '4', t: '5' })
  })

  it('should add unknown arguments to unknown array', () => {
    expect(parse([ 'for', 'reasons', 'unknown' ])).toMatchObject({unknown: [ 'for', 'reasons', 'unknown' ]})
  })

})

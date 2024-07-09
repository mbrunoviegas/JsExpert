import { describe, it } from 'mocha';
import { expect } from 'chai';
import { evaluateRegex, InvalidRegexError } from '../src/util.js'

describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-zA-Z0-9]+\s?)+$/

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This regex is invalid: ${unsafeRegex}`)
  })

  it('#evaluateRegex should not throw an error using a safe refex', () => {
    const safeRegex = /^([a-z])$/

    expect(() => evaluateRegex(safeRegex)).to.be.ok
  })
})
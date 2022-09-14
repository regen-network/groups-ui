import { describe, expect, it } from 'vitest'

import {
  clearEmptyStr,
  numToPercentStr,
  percentStrToNum,
  strToNumOrEmpty,
} from 'util/helpers'

describe('Helpers', () => {
  it('intToPercentStr', () => {
    expect(numToPercentStr(45)).toEqual('0.45')
    expect(numToPercentStr(45.5)).toEqual('0.455')
  })
  it('percentStrToNum', () => {
    expect(percentStrToNum('0.45')).toEqual(45)
  })
  it('strToNumOrEmpty', () => {
    expect(strToNumOrEmpty('1')).toEqual(1)
    expect(strToNumOrEmpty('1.1')).toEqual(1)
    expect(strToNumOrEmpty('bob')).toEqual('')
    expect(strToNumOrEmpty(undefined)).toEqual('')
  })
  it('clearEmptyStr', () => {
    expect(clearEmptyStr('')).toEqual(undefined)
    expect(clearEmptyStr(undefined)).toEqual(undefined)
    expect(clearEmptyStr(1)).toEqual(1)
  })
})

const assert = require('assert')	

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value for Symbol'

assert.deepStrictEqual(user.userName, 'value for normal Objects')
assert.deepStrictEqual(user[uniqueKey], 'value for Symbol')
assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123) 

// Wll known symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  }) 
  
}
assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate { 
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) { 
    if(coercionType !== 'string') throw new TypeError()
    const items = this[kItems]
      .map(item => new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric' }).format(item))
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items)
  }

  *[Symbol.iterator]() {
    for(const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for(const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }

  get [Symbol.toStringTag]() {
    return 'What??'
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2020, 2, 2]
)

const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2020, 2, 2)
]

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object What??]')
assert.throws(() => myDate + 1, TypeError)

assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2020')
assert.deepStrictEqual([...myDate], expectedDates)

; (async () => {
  const dates = []
  for await (const date of myDate) {
    dates.push(date)
  }

  const expectedDatesInISOString = expectedDates.map(item => item.toISOString())
  console.log(dates)
  assert.deepStrictEqual(dates, expectedDatesInISOString)
} )()
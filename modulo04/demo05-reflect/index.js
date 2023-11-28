'use strict'

const assert = require('assert')

const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

myObj.add.apply = function () { throw new TypeError('Eita!') }
assert.throws(() => myObj.add.apply({}, []), {  
  name: 'TypeError',
  message: 'Eita!'
})

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)

function MyDate() { }

Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey dude' })
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey dude')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')

const withDelete = { user: 'Marcelo Viegas ' }
// imperformático, evitar ao máximo
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Marcelo Viegas' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)

assert.deepStrictEqual(1['userName'], undefined)
assert.throws(() => Reflect.get(1, 'userName'), TypeError)

assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))

const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'marcelo.viegas'
}

const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), ['id', Symbol.for('password'), user])


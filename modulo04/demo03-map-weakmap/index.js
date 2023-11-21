const assert = require('assert')
const myMap = new Map()

myMap
  .set(1, 'one')
  .set('Marcelo', { text: 'two' })
  .set(true, () => 'hello')

const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1'],
])

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Marcelo'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em objetos a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'Marcelo' })
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Marcelo' })

assert.deepStrictEqual(myMap.size, 4)
assert.deepStrictEqual(myMap.has('Marcelo'), true)
assert.ok(myMap.delete(1))
assert.deepStrictEqual(myMap.has(1), false)
assert.deepStrictEqual(myMap.size, 3)
assert.deepStrictEqual(JSON.stringify([...myMap]), '[["Marcelo",{"text":"two"}],[true,null],[{"id":1},{"name":"Marcelo"}]]')

// Object é inseguro, pois dependendo da chave ele substitui o valor
const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva',
}

myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

myMap.clear()
assert.deepStrictEqual(myMap.size, 0)
assert.deepStrictEqual([...myMap.keys()], [])

// WeakMap

const weakMap = new WeakMap()
const hero = { name: 'Flash' }
weakMap.set(hero)
weakMap.get(hero)
weakMap.has(hero)
weakMap.delete(hero)

// Não tem como iterar em chaves, valores ou entries
// Não tem como limpar o WeakMap manualmente
// Só tem métodos set, get, has e delete
// Usado para ter um dicionário privado em objetos
// Usado para ter uma referência privada em objetos

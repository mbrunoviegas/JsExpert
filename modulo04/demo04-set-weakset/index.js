const assert = require('assert')

const arr1 = ['0', '1', '2']
const arr2 = ['2', '0', '3']
const arr3 = arr1.concat(arr2)
assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

// intersection, union, difference
const setA = new Set(arr1)
const setB = new Set(arr2)
// intersection
const intersection = new Set([...setA].filter(item => setB.has(item)))
assert.deepStrictEqual(Array.from(intersection), ['0', '2'])

// union
const union = new Set([...setA, ...setB])
assert.deepStrictEqual(Array.from(union), ['0', '1', '2', '3'])

// difference
const difference = new Set([...setA].filter(item => !setB.has(item)))
assert.deepStrictEqual(Array.from(difference), ['1'])

// weakset
// só faz sentido para valores que se mantém em memória
// nao aceita valores primitivos
const weakSet = new WeakSet()
const hero1 = { name: 'Flash' }
const hero2 = { name: 'Batman' }
weakSet.add(hero1)
weakSet.add(hero2)
weakSet.delete(hero1)
weakSet.add(hero2)
assert.deepStrictEqual(weakSet.has(hero1), false)
assert.deepStrictEqual(weakSet.has(hero2), true)


const item = {
  name: 'Marcelo Viegas',
  age: 24,
  // Chama o método toString() quando tentamos concatenar o objeto com uma string
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`
  },
  // Chama o método valueOf() quando tentamos somar o objeto com um número
  valueOf() { 
    return this.age
  },
  [Symbol.toPrimitive](coercionType) { 
    console.log('trying to convert to', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: this.age + 24
    }

    return types[coercionType] || types.string
  
  }
}

// console.log('toString: ', String(item))
// console.log('valueOf: ', Number(item))

console.assert(item + 0 === '{"name":"Marcelo Viegas","age":24}0')
// console.log('!!item is true?', !!item)
console.assert('Marcelo Viegas{"name":"Marcelo Viegas","age":24}', 'Marcelo Viegas'.concat(item))
// console.log('implicit + explicit coercion (using ==): ', item == String(item))
console.assert(item == String(item))

const item2 = { ...item, name: "wan", age: 20 }
// console.log('New Object: ', item2)
console.assert(item2.name == "wan" && item2.age == 20)
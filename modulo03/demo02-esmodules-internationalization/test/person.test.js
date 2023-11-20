import mocha from 'mocha';
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js';

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString('1 Bike,Aviao 100000 2021-01-01 2023-01-01')
    const expected = {
      id: "1",
      vehicles: ['Bike', 'Aviao'],
      kmTraveled: '100000',
      from: '2021-01-01',
      to: '2023-01-01'
    }

    expect(person).to.be.deep.equal(expected)
  })

  it('should format values', () => {
    const person = new Person({
      id: "1",
      vehicles: ['Bike', 'Aviao'],
      kmTraveled: '100000',
      from: '2021-01-01',
      to: '2023-01-01'
    })

    const result = person.formatted('pt-BR')
    const expected = {
      id: 1,
      vehicles: 'Bike e Aviao',
      kmTraveled: '100.000 km',
      from: '01 de janeiro de 2021',
      to: '01 de janeiro de 2023'
    }

    expect(result).to.be.deep.equal(expected)
  })
})
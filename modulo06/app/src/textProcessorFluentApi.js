import { Person } from './person.js'
import { evaluateRegex } from './util.js'

export class TextProcessorFluentAPI {
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    this.#content = this.#content.match(/(?<=[contratante|contratada]:\s)(?!\s)(.*\n.*?)$/gmi)
    return this
  }

  divideTextInColumns() { 
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(column => column.replace(trimSpaces, '')))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

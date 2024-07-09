import { evaluateRegex } from './util.js'

export class TextProcessorFluentAPI {
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    this.#content = this.#content.match(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
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

  build() {
    return this.#content
  }
}

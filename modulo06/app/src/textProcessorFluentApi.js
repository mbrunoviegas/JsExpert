export class TextProcessorFluentAPI {
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    this.#content = this.#content.match(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
    console.log(this.#content)
    return this
  }

  build() {
    return this.#content
  }
}

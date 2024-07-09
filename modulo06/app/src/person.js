import { evaluateRegex } from "./util.js"

export class Person {
  constructor(
    [
      nome,
      nacionalidade,
      estadoCivil,
      documento,
      rua,
      numero,
      bairro,
      estado
    ]
  ) {
    const firstLetterExp = evaluateRegex(/^(\w)([a-zA-Z]+$)/g)
    const formatFirstLetter = (prop) => prop.replace(firstLetterExp, (match, p1, p2) => `${p1.toUpperCase()}${p2.toLowerCase()}`)

    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    this.documento = documento.replace(evaluateRegex(/\D/g), '')
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/g), '').at(0)
    this.numero = numero
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/g), '').at(0)
    this.estado = estado.replace(evaluateRegex(/\.$/g), '')
  }

}
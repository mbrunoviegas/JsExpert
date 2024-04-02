import { describe, it } from 'mocha';
import { expect } from 'chai';
import { TextProcessorFluentAPI } from '../src/textProcessorFluentApi.js';
import mock from './mocks/valid.js';

describe('TextProcessorFluentAPI', () => {
  it('#build', () => {
    const result = new TextProcessorFluentAPI(mock).build()
    expect(result).to.be.deep.equal(mock)
  })

  it('#extractPeopleData', () => {
    const result = new TextProcessorFluentAPI(mock)
      .extractPeopleData()
      .build()
    
    const expected = [
      ["Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ", "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "].join("\n"),
      ["Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ", "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. "].join("\n"),
      ["Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ", "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.  "].join("\n")
    ]
    
    expect(result).to.be.deep.equal(expected)
  })
})
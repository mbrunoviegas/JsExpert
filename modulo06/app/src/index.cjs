'use strict'

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

  ; (
    async () => {
      const dataBuffer = await readFile(join(__dirname, '../../docs/contrato.pdf'))
      const data = await pdf(dataBuffer).catch((error) => { console.log(error) })

      const TextProcessorFacade = (await import('./textProcessorFacade.js')).default

      const textProcessorFacade = new TextProcessorFacade(data.text)
      console.log(textProcessorFacade.getPeopleFromPDF())
    }
  )()
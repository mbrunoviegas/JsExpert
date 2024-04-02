'use strict'

const { readFile } = require('fs/promises')
const { join } = require('path')
const pdf = require('pdf-parse')

  ; (
    async () => {
      const dataBuffer = await readFile(join(__dirname, '../../docs/contrato.pdf'))
      const data = await pdf(dataBuffer).catch((error) => { console.log(error) })
      console.log(data.text)
    }
  )()
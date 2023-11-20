'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
  watch(event, filename) {
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString())
  }
}

const file = new File()

// dessa forma o this dentro da função watch não é mais o this da classe File
// o bind retorna uma função com o this setado para o que passamos por parâmetro
// watch(__filename, file.watch.bind(file))

file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])
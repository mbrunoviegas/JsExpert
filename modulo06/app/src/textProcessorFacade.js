import { TextProcessorFluentAPI } from './textProcessorFluentApi.js'

export default class TextProcessorFacade{
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
                .extractPeopleData()
                .divideTextInColumns()
                .removeEmptyCharacters()
                .mapPerson()
                .build()
    }
}
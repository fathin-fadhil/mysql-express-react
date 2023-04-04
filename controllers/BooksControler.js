import Books from "../models/BooksModel.js";

export async function getBooks() {
    try {
        const rawBooks = await Books.findAll()
        const books = await rawBooks.map(value => value.dataValues)
        return books
    } catch (error) {
        console.log(error)
    }
}

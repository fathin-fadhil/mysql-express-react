import { Op } from "sequelize";
import BorrowerList from "../models/BorrowerListModel.js";

export async function getBorrowedBooksId(email) {
    try {
        const borrowedBooks = await BorrowerList.findAll({
            where: {
                borrower_email: email
            }
        })
        if (borrowedBooks == null) return null
        const borrowedBooksId = await borrowedBooks.map((val) => val.dataValues.book_id)
        return borrowedBooksId
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getBorrowerById(bookId) {
    try {
        const borrowedBooks = await BorrowerList.findAll({
            where: {
                book_id: bookId
            }
        })
    return borrowedBooks
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function borrowBook(email, bookId) {
    try {
        await BorrowerList.create({
            borrower_email: email,
            book_id: bookId
        })
    } catch (error) {
        console.log(error)
    }
}
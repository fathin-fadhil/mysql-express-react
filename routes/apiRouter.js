import { Router } from 'express';
import { isAuthenticated } from '../middleware/checkAuthentication.js';
const router = Router()
import { findBooks, getPagination, getPagingData, getBookById } from '../controllers/BooksControler.js';
import { getBorrowedBooksId } from "../controllers/BorrowerControler.js";

router.get('/test', isAuthenticated, (req, res) => {
    res.json({goodbye: 'world'})
})

router.get('/catalog', isAuthenticated, async (req, res) => {
    try {
        const { page, size, query } = req.query;
        var condition = query || ''
        if (page == 0) return res.sendStatus(400)
        var dbPage = page - 1

        const { limit, offset } = getPagination(dbPage, size);
        const books = await findBooks(condition, limit, offset)
        const booksData = getPagingData(books, dbPage, limit)

        res.json({booksData})
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
    
})

router.get('/borrowing', isAuthenticated, async (req, res) => {
    const email = req.email

    const borrowedBooksId = await getBorrowedBooksId(email)
    let books = []
    for (let index = 0; index < borrowedBooksId.length; index++) {
        const book = await getBookById(borrowedBooksId[index])
        books.push(book)
    }
    res.json({booksArray: books})
})

export default router
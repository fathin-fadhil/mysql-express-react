import { Router } from 'express';
import { isAuthenticated } from '../middleware/checkAuthentication.js';
const router = Router()
import { findBooks, getPagination, getPagingData, getBookById } from '../controllers/BooksControler.js';
import { getBorrowedBooksId, borrowBook, returnBook } from "../controllers/BorrowerControler.js";
import { isAdmin } from "../middleware/checkRoles.js";
import { editUser, getUsers } from '../controllers/UserController.js';

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
    res.json({booksData: {booksArray: books, totalItems: books.length}})
})

router.post('/borrow', isAuthenticated, async (req, res) => {
    const email = req.email
    const bookId = req.body.bookId

    const borrowedBooks = await getBorrowedBooksId(email)
    
    if (borrowedBooks.includes(bookId)) {
        return res.status(409).json({message: 'User already borrowed this book'})
    }
    await borrowBook(email, bookId)
    res.json({message: "Request successful"})
})

router.post('/return', isAuthenticated, async (req, res) => {
    try {
        const email = req.email
        const bookId = req.body.bookId

        await returnBook(email, bookId)    
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
    
})

router.get('/users', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await getUsers()
        const filteredUsers = await users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles
        }))
        res.json({usersData: {
            usersArray: filteredUsers
        }})
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/edituser', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const {id, email, name, roles} = req.body
        await editUser(id, name, email, roles)
        res.sendStatus(202)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default router
import { Router } from 'express';
import { isAuthenticated } from '../middleware/checkAuthentication.js';
const router = Router()
import { findBooks, getPagination, getPagingData } from '../controllers/BooksControler.js';

router.get('/test', isAuthenticated, (req, res) => {
    res.json({goodbye: 'world'})
})

router.get('/catalog', /* isAuthenticated,  */async (req, res) => {
    try {
        const { page, size, query } = req.body;
        var condition = query || ""
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

router.get('/catalog/search', /* isAuthenticated,  */async (req, res) => {
    const query = req.body.query
    const books = await findBooks(query)
    res.json({booksArray: books})
})

export default router
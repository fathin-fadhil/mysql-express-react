import { Router } from 'express';
import { isAuthenticated } from '../middleware/checkAuthentication.js';
const router = Router()
import { getBooks } from '../controllers/BooksControler.js';

router.get('/test', isAuthenticated, (req, res) => {
    res.json({goodbye: 'world'})
})

router.get('/catalog', isAuthenticated, async (req, res) => {
    const books = await getBooks()
    res.json({booksArray: books})
})

export default router
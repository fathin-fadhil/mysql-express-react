import { Router } from 'express';
import { isAuthenticated } from '../middleware/checkAuthentication.js';
const router = Router()

router.get('/test', isAuthenticated, (req, res) => {
    res.json({goodbye: 'world'})
})

export default router
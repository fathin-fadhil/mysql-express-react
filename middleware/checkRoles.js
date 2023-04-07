import { getUserByEmail } from "../controllers/UserController.js";

export async function isAdmin(req, res, next) {
    try {
        const email = req.email
        const user = await getUserByEmail(email)
        if (user.roles === 'admin') {
            next()
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.sendStatus(500)
    }

}
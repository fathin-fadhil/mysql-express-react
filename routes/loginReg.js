import express from 'express';
import { register } from "../controllers/UserController.js";
var router = express.Router();


router.post('/login', (req, res) => {
    let {email, password} = req.body
    console.log(email + " " + password)

    res.json({message: "login successful"}).status(200)
})

router.post('/register', register)

export default router
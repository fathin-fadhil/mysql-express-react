import express from 'express';
var router = express.Router();

router.post('/login', (req, res) => {
    let {email, password} = req.body
    console.log(email + " " + password)

    res.json({message: "login successful"}).status(200)
})

router.post('/register', (req, res) => {
    let {name, email, password} = req.body
    console.log(name + " " + email + " " + password)

    res.json({message: "register successful"}).status(200)
})

export default router
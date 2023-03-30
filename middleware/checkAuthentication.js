import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    try { 
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.sendStatus(401)
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.sendStatus(401)
            }
            req.email = decoded.email
            next()
        })
    } catch(err) {
        console.log('isAuthenticate arror => ', err)
    }
}
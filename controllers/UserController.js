import Users from '../models/UsersModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function getUsers() {
    try {
        const usersData = await Users.findAll()
        const users = await usersData.map((user) => user.dataValues)
        return users
    } catch (error) {
        console.error(error)
    }    
}

export const login = async (req, res) => {
    
    const searchedUser = await getUserByEmail(req.body.email)
    if (searchedUser === null) {
        return res.status(401).json({message: "Email not found"})
    }
    const {id, name, email, password, roles} = searchedUser

    const match = await bcrypt.compare(req.body.password, password)

    if (!match) {
        return res.status(401).json({message: "Wrong password"})
    }

    const accessToken = jwt.sign({userId: id, name, email}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s'
    })
    const refreshToken = jwt.sign({userId: id, name, email}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    })

    await Users.update({refresh_token: refreshToken}, {
        where: {
            id: id
        }
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
        // add secure: true klo pake https
    })
    res.json({accessToken, name, email, roles})    
}

export const register = async (req, res) => {
    const {name, email, password, confPassword} = req.body
    
    if (password !== confPassword) {
        res.status(400).json({message: 'Password dan Confirm Password tidak sesuai'})
    } else {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            if ((await getUserByEmail(email)) !== null) {
                return res.status(400).json({message: "Email already exist"})
            } else {
                await Users.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    roles: 'user'
                })
                res.json({message: 'Register Successful'})
            }            
        } catch (error) {
            console.log(error)
        }
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.sendStatus(204)
        }
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })
        if (!user[0]) {
            return res.sendStatus(204)
        }
        const userId = user[0].id
        await Users.update({refresh_token: null}, {
            where: {
                id: userId
            }
        })
        res.clearCookie('refreshToken').sendStatus(200)
}

export const getUserByEmail = async (emailToFind) => {
    const user = await Users.findOne({
        where: {
            email: emailToFind
        }
    })
    if (user !== null) {
        return user['dataValues']
    }
    return null
}

export async function editUser(userId, name, email, roles) {
    try {
        await Users.update({
            name,
            email,
            roles
        }, {
            where: {
                id: userId
            }
        })        
    } catch (error) {
        console.log(error)
    }    
}
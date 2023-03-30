import db from '../config/database.js';
import Users from '../models/UsersModel.js'
import bcrypt from 'bcrypt';

export async function getUsers() {
    try {
        const users = await Users.findAll()
        return users
    } catch (error) {
        console.error(error)
    }
    
}

export const register = async (req, res) => {
    const {name, email, password, confPassword} = req.body
    console.log("🚀 ~ file: UserController.js:17 ~ register ~ email:", email)
    
    if (password !== confPassword) {
        res.status(400).json({message: 'Password dan Confirm Password tidak sesuai'})
    } else {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        try {
            if ((await getUserByEmail(email)) !== null) {
                return res.status(400).json({message: "email already exist"})
            } else {
                await Users.create({
                    name: name,
                    email: email,
                    password: hashedPassword
                })
                res.json({message: 'Register Successful'})
            }            
        } catch (error) {
            console.log(error)
        }
    }
}

export const getUserByEmail = async (emailToFind) => {
    const user = await Users.findOne({
        where: {
            email: emailToFind
        }
    })
    console.log("🚀 ~ file: UserController.js:48 ~ getUserByEmail ~ user:", user)
    if (user !== null) {
        return user['dataValues']
    }
    return null
}



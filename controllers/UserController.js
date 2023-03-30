let Users = require('../models/UsersModel.js')

export async function getUsers() {
    try {
        const users = await Users.findAll()
        console.log(users)
        return users
    } catch (error) {
        console.error(error)
    }
    
}


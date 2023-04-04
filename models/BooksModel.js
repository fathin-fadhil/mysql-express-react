import { Sequelize } from "sequelize"
import db from "../config/database.js"

const {DataTypes} = Sequelize

const Books = db.define('books', {
    judul: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    tahun_terbit: {
        type: DataTypes.INTEGER
    },
    penerbit: {
        type: DataTypes.STRING
    },
    pengarang: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.TEXT
    },
    ISBN: {
        type: DataTypes.STRING
    },
    jumlah_halaman: {
        type: DataTypes.INTEGER
    }
})

export default Books
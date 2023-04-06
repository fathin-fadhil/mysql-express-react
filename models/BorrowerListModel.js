import db from "../config/database.js";
import { Sequelize } from "sequelize";

const { DataTypes } = Sequelize

const BorrowerList = db.define('borrower_list', {
    borrower_email: {
        type: DataTypes.STRING
    },
    book_id: {
        type: DataTypes.INTEGER
    },
})

export default BorrowerList
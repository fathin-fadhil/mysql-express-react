import { Op } from "sequelize";
import Books from "../models/BooksModel.js";

export async function findBooks(query, limit, offset) {
    try {
        const rawBooks = await Books.findAndCountAll({
            where: {
                [Op.or]: 
                [
                    {
                        judul : {
                            [Op.like]: `%${query}%`
                        }
                    }, {
                        tahun_terbit: {
                            [Op.like]: `%${query}%`
                        }
                    }, {
                        penerbit: {
                            [Op.like]: `%${query}%`
                        }
                    },{
                        pengarang: {
                            [Op.like]: `%${query}%`
                        }
                    },{
                        deskripsi: {
                            [Op.like]: `%${query}%`
                        }
                    }, {
                        ISBN: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            },
            limit: limit,
            offset: offset
        })
        //const books = await rawBooks.map(value => value.dataValues)
        return rawBooks
    } catch (error) {
        console.log(error)
    }
}

export const getPagination = (page, size) => {
    const limit = size ? +size : 4;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};

export const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: booksArray } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, booksArray, totalPages, currentPage: currentPage + 1 };
};
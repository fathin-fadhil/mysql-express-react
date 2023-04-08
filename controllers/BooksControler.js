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
        return rawBooks
    } catch (error) {
        console.log(error)
    }
}

export async function getBookById(id) {
    try {
        const book = await Books.findOne({
            where: {
                id: id
            }
        })
        
        if (book !== null) {
            return book.dataValues
        }
        return null
    } catch (error) {
        console.log(error)
    }
}

export async function editBook(id, judul, image_url, tahun_terbit, penerbit, pengarang, deskripsi, ISBN, jumlah_halaman) {
    try {
        await Books.update({
            judul, 
            image_url, 
            tahun_terbit, 
            penerbit, 
            pengarang, 
            deskripsi, 
            ISBN, 
            jumlah_halaman
        }, {
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function deleteBook(id) {
    try {
        await Books.destroy({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.log(error)    
    }
}

export async function newBook(judul, image_url, tahun_terbit, penerbit, pengarang, deskripsi, ISBN, jumlah_halaman) {
    try {
        await Books.create({
            judul, 
            image_url, 
            tahun_terbit, 
            penerbit, 
            pengarang, 
            deskripsi, 
            ISBN, 
            jumlah_halaman
        })        
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
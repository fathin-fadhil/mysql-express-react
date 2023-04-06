import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";

import React from 'react'

function MyBooks() {
    const axiosPrivate = useAxiosPrivate()

    const getBooks = async () => {
        const books = await axiosPrivate.get('/api/borrowing')
        console.log(books);
    }
    
    useEffect(() => {
        getBooks()
    }, []);

    return (
        <div>MyBooks</div>
        
    )
}


export default MyBooks
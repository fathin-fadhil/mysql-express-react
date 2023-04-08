import { Typography, Textarea, Tabs, TabsHeader, TabsBody, Tab, TabPanel, Input, Button, Dialog, DialogHeader, DialogBody, DialogFooter, } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ReactPaginate from "react-paginate";

function BooksTable({setResponseLoading, setResponseDialog, setServerResponse }) {
    const [search, setSearch] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [dataBuku, setDataBuku] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [editBookDialog, setEditBookDialog] = useState(false);
    const [editedBookData, setEditedBookData] = useState({});
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(0);
    const [newBookDialog, setNewBookDialog] = useState(false);
    const [newBookData, setNewBookData] = useState({});
    const [newBookError, setNewBookError] = useState('');

    const axiosPrivate = useAxiosPrivate()

    const onSearchChange = (ev) => {
        setSearch(ev.target.value)
    }

    const onSearch = () => {
        setPage(0)
        handleSearch()
    }

    const handleSearch = async () => {
        try {
            const books = await axiosPrivate.get('/api/catalog', {
                params: {                    
                    page: page + 1,
                    size: '10',
                    query: search
                }
            })    
            const booksArray = books.data.booksData.booksArray
            if(books.data.booksData.totalItems === 0 ) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
            setTotalPage(books.data.booksData.totalPages)
            setErrorMessage({})
            setDataBuku(booksArray)
        } catch (error) {
            console.log(error)
            setErrorMessage({message:error.message, code: error.code, data: error.response?.statusText})
        }
    }

    const changePage = ({selected}) => {
        setPage(selected)
        window.scrollTo({behavior: 'smooth', top:0})
    }

    const onEditedBookChange = (ev) => {
        setEditedBookData(prev => ({...prev, [ev.target.name]: ev.target.value}))
    }

    const onNewBookChange = (ev) => {
        setNewBookData(prev => ({...prev, [ev.target.name]: ev.target.value}))
    }

    const handleEditDialog = (index) => {
        setEditedBookData({...dataBuku[index] })
        setEditBookDialog(true)
    }

    const handleEditBook = async () => {    
        setEditBookDialog(false)
        setResponseLoading(true)
        setResponseDialog(true)
        try {
            const res = await axiosPrivate.put('/api/book', {
                ...editedBookData
            })
            setResponseLoading(false)
            setServerResponse('Request Accepted')
            handleSearch()
        } catch (error) {
            setServerResponse(`${error.message}`)
        }
        setResponseLoading(false)
    }

    const handleDeleteBook = async () => {
        setDeleteDialog(false)
        setResponseLoading(true)
        setResponseDialog(true)
        try {
            const res = await axiosPrivate.delete('/api/book', {
                params: {
                    id: deleteBookId
                }                    
            })
            setResponseLoading(false)
            setServerResponse('Request Accepted')
            handleSearch()
        } catch (error) {
            setServerResponse(`${error.message}`)
        }
        setResponseLoading(false)
    }

    const handleDeleteDialog = (id) => {
        setDeleteBookId(id)        
        setDeleteDialog(true)
    }

    function handleNewBook() {
        if (!newBookData.judul || !newBookData.image_url || !newBookData.penerbit || !newBookData.tahun_terbit || !newBookData.pengarang || !newBookData.ISBN || !newBookData.jumlah_halaman || !newBookData.deskripsi) {
            return setNewBookError('Semua input data harus diisi')
        }
        setResponseLoading(true)
        setNewBookDialog(false)
        setResponseDialog(true)
        try {
            const res = axiosPrivate.post('/api/book', {
                ...newBookData
            })
            setResponseLoading(false)
            setServerResponse('Request Accepted')
            setNewBookData({})
            handleSearch()
        } catch (error) {
            setServerResponse(`${error.message}`)
        }
        setResponseLoading(false)
        setNewBookError('')
    }

    useEffect(() => {
        handleSearch()
        let input = document.getElementById('input')
        let btn = document.getElementById('searchBtn')
        const action = (ev) => {
            if (ev.key === 'Enter') {
                btn.click()
            }
        }
        input.addEventListener('keypress', action)

        return () => { input.removeEventListener('keypress', action)}
    }, [page])

  return (
    <div className="flex flex-col overflow-x-auto w-screen justify-center">
        <div className=' pt-6 pb-4 px-6 inline-flex justify-center items-center gap-3'>
            <div className="relative flex w-full max-w-[40rem]" >
                <Input
                    type="text"
                    label="Search"
                    value={search}
                    onChange={onSearchChange}
                    className="pr-20"
                    id='input'
                    containerProps={{
                    className: "min-w-0"                       
                    }}
                />
                <Button
                    size="sm"
                    color="blue"
                    className="!absolute right-1 top-1 rounded capitalize"
                    onClick={onSearch}
                    id='searchBtn'
                >
                    Cari
                </Button>
            </div>

            <div>
                <Button size="sm" onClick={() => {setNewBookDialog(true)}}>Tambah Buku +</Button>
            </div>
        </div>

        <div className= {`${isEmpty ? '' : 'hidden'} text-center`}>
                <p className=' text-xl'>
                        No item found with that keyword
                </p>
        </div>

        <div className={`${errorMessage.code ? '' : "hidden"} text-center` }>
                <p className='text-lg text-gray-500'>
                    Cant retrieve data
                </p>
                <p className='text-base text-red-900'>
                    {errorMessage.message}
                </p>
                <p className='text-base text-red-900'>
                    {errorMessage.data}
                </p>
        </div>

        <div className={`relative overflow-x-auto shadow-lg sm:rounded-lg max-w-5xl w-full mx-auto ${!isEmpty ? '' : 'hidden'} `}>        
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-blue-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Judul Buku
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pengarang
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Penerbit
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ISBN
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                        Action
                        <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataBuku.map((book, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {book.id}
                                </th>
                                <td scope="row" className="px-6 py-4 ">
                                    {book.judul}
                                </td>
                                <td className="px-6 py-4">
                                    {book.pengarang}
                                </td>
                                <td className="px-6 py-4">
                                    {book.penerbit}
                                </td>
                                <td className="px-6 py-4">
                                    {book.ISBN}
                                </td>
                                <td className="px-6 py-4 ">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2" onClick={() => {handleEditDialog(index)}}>Edit</a>
                                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => {handleDeleteDialog(book.id)}} >Delete</a>
                                </td>
                            </tr> 
                        ))
                    }                        
                </tbody>
            </table>
        </div>   

        <Dialog open={editBookDialog} size="xxl" handler={() => {setEditBookDialog(!editBookDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">Edit Book</DialogHeader>

          <DialogBody className=" grid grid-cols-1 md:grid-cols-2  self-center w-full xl:w-2/3">
            <div className="p-2">
              <Typography>Book ID</Typography>
              <Input value={editedBookData.id} disabled name="id" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Judul Buku' variant="static" placeholder="Judul Buku" value={editedBookData.judul} name="judul" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Image Url' variant="static" placeholder="Image Url" value={editedBookData.image_url} name="image_url" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Tahun Terbit' variant="static" placeholder="Tahun Terbit" type="number" value={editedBookData.tahun_terbit} name="tahun_terbit" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Penerbit' variant="static" placeholder="Penerbit" value={editedBookData.penerbit} name="penerbit" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Pengarang' variant="static" placeholder="Pengarang" value={editedBookData.pengarang} name="pengarang" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='ISBN' variant="static" placeholder="ISBN" value={editedBookData.ISBN} name="ISBN" onChange={onEditedBookChange}></Input>
            </div>
            <div className="p-4">              
              <Input label='Jumlah Halaman' variant="static" placeholder="Jumlah Halaman" type="number" value={editedBookData.jumlah_halaman} name="jumlah_halaman" onChange={onEditedBookChange}></Input>
            </div>            
            <div className="p-4 md:col-span-2">              
              <Textarea label="Deskripsi" className=" " value={editedBookData.deskripsi} name="deskripsi" onChange={onEditedBookChange}></Textarea>
            </div>
          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="text" color="red" onClick={() => setEditBookDialog(!editBookDialog)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleEditBook()}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>  
        
        <div className='flex justify-center my-7 h-fit'>
                <ReactPaginate previousLabel='<' nextLabel=">" pageCount={totalPage} onPageChange={changePage} initialPage={0}
                    containerClassName='inline-flex -space-x-px h-fit'
                    activeLinkClassName='px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    previousLinkClassName='px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    pageLinkClassName='px-3 py-2 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    nextLinkClassName='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'                    
                    pageClassName='h-fit'
                ></ReactPaginate>
        </div>

        <Dialog open={deleteDialog} size="lg" handler={() => {setDeleteDialog(!deleteDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">Confirm Deletion</DialogHeader>

          <DialogBody className="  self-center text-center w-full">
            Apakah anda yakin akan menghapus Buku ini?
          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="text" color="red" onClick={() => setDeleteDialog(!deleteDialog)} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleDeleteBook()}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>     

        <Dialog open={newBookDialog} size="xxl" handler={() => {setNewBookDialog(!newBookDialog)}} className="flex flex-col justify-center p-4">
          <DialogHeader className="text-center inline">New Book</DialogHeader>

          <DialogBody className="w-full flex flex-col align-middle">
            <div className=" grid grid-cols-1 md:grid-cols-2  self-center w-full xl:w-2/3">
                <div className="p-4">              
                <Input label='Judul Buku' variant="static" placeholder="Judul Buku" value={newBookData.judul} name="judul" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='Image Url' variant="static" placeholder="Image Url" value={newBookData.image_url} name="image_url" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='Tahun Terbit' variant="static" placeholder="Tahun Terbit" type="number" value={newBookData.tahun_terbit} name="tahun_terbit" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='Penerbit' variant="static" placeholder="Penerbit" value={newBookData.penerbit} name="penerbit" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='Pengarang' variant="static" placeholder="Pengarang" value={newBookData.pengarang} name="pengarang" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='ISBN' variant="static" placeholder="ISBN" value={newBookData.ISBN} name="ISBN" onChange={onNewBookChange} required></Input>
                </div>
                <div className="p-4">              
                <Input label='Jumlah Halaman' variant="static" placeholder="Jumlah Halaman" type="number" value={newBookData.jumlah_halaman} name="jumlah_halaman" onChange={onNewBookChange} required></Input>
                </div>            
                <div className="p-4 md:col-span-2">              
                <Textarea label="Deskripsi" className=" " value={newBookData.deskripsi} name="deskripsi" onChange={onNewBookChange} required></Textarea>
                </div>
            </div>
            <div className=" text-center">
                <Typography className={`text-red-900 ${newBookError? '' : 'hidden'}`}>
                    {newBookError}
                </Typography>
            </div>

          </DialogBody>

          <DialogFooter className=" justify-center">
            <Button variant="text" color="red" onClick={() => {setNewBookDialog(!newBookDialog)}} className="mr-1">
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="blue" onClick={() => handleNewBook()} type="submit">
              <span>Add</span>
            </Button>
          </DialogFooter>
        </Dialog>  

    </div>
    

  )
}

export default BooksTable
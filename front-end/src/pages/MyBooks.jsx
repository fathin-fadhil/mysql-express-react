import {useState, useEffect} from 'react';
import NavbarComp from '../components/NavbarComp';
import { Card, CardHeader, CardBody, Typography, Button, Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import useWindowDimensions from '../hooks/useWindowsDimensions';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import FooterComp from '../components/FooterComp'

const MyBook = () => {
    const [dialog, setDialog] = useState(false);
    const [clickedBook, setClikedBook] = useState({ judul: 'No book Selected', image_url: 'No book Selected', tahun_terbit: 'No book Selected', penerbit: 'No book Selected', pengarang: 'No book Selected', deskripsi: 'No book Selected', ISBN: 'No book Selected', jumlah_halaman: 'No book Selected'});
    const [dialogSize, setDialogSize] = useState('xl');
    const [dataBuku, setDataBuku] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [errorMessage, setErrorMessage] = useState({code:'', data:''});
    const [returnDialog, setReturnDialog] = useState(false);
    const [bookIdAboutToBeReturned, setBookIdAboutToBeReturned] = useState();
    const [returnError, setReturnError] = useState({code: '', data: '', message: ''});
    const [returnLoading, setReturnLoading] = useState(false);
    const [returnSuccess, setReturnSuccess] = useState(false);

    const { width } = useWindowDimensions()

    const axiosPrivate = useAxiosPrivate()

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const books = await axiosPrivate.get('/api/borrowing')    
            const booksArray = books.data.booksData.booksArray
            console.log(books)
            if(books.data.booksData.totalItems === 0 ) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
            setErrorMessage({})
            setDataBuku(booksArray)
        } catch (error) {
            console.log(error)
            setErrorMessage({message:error.message, code: error.code, data: error.response?.statusText})
        }
        setIsLoading(false)
    }

    const handleReturnBook = async () => {
        setReturnSuccess(false)
        setReturnLoading(true)
        try {            
            const res = await axiosPrivate.post('/api/return', {
                bookId: bookIdAboutToBeReturned
            })
            console.log(res)
            setReturnSuccess(true)
            handleSearch()
        } catch (error) {
            setReturnError({message:error.message, code: error.code, data: error.response?.statusText})
        }
        setReturnLoading(false)
    }

    const handleReturnDialog = (bookId) => {
        setBookIdAboutToBeReturned(bookId)
        setReturnError({})
        setReturnSuccess(false)
        setReturnDialog(!returnDialog)     
    }

    const openDialog = (indexBuku) => {
        if (width > 1280) {
            setDialogSize('md')
        } else if (width <= 640) {
            setDialogSize('xxl')
        } else {
            setDialogSize('xl')
        }
        console.log('d size =' + dialogSize)
        setClikedBook(dataBuku[indexBuku])
        setDialog(!dialog)
    }

    useEffect(() => {
        handleSearch()
    }, []);

    return (
        <div className=' flex flex-col h-screen '>
            <NavbarComp></NavbarComp>            

            <div className='text-center p-5'>
                <Typography variant='h2' className='  align-middle self-center '>
                    Daftar Peminjaman Buku
                </Typography>
                <hr className=' w-28 mx-auto bg-blue-400 h-2 my-1'></hr>
            </div>

            <div role="status " className={`${isLoading? '' : 'hidden'} m-auto flex justify-center `}>
                <svg aria-hidden="true" class="inline w-20  mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>

            <div className= {`${isEmpty ? '' : 'hidden'} text-center grow flex justify-center`}>
                <Typography variant='h3' className='  align-middle self-center text-gray-500 font-medium'>
                    Kamu belum meminjam buku apapun
                </Typography>
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



            <div className=' grow mb-3'>
                <div className='grid grid-cols-1 customDesktopBp:grid-cols-2 px-4 '>
                    {dataBuku.map((value, index) => (
                    <Card shadow={false} key={index} className='flex maxSm:flex-col flex-row p-4 shadow-lg  m-3 maxSm:text-center maxSm:items-center py-6 bg-blue-gray-50'>
                        <CardHeader className='m-0 flex-shrink-0  h-fit my-auto w-fit '>
                            <img src={value.image_url} className=' h-44 md:h-52 xl:h-80 max-h-80 '></img>
                        </CardHeader>
                        <CardBody className='flex flex-col pl-4 py-0 flex-shrink overflow-clip flex-grow' >
                            <Typography className=' font-bold text-black text-xl md:text-3xl xl:text-3xl '>{value.judul}</Typography>
                            <Typography className=' font-medium text-base md:text-base xl:text-lg '>{value.pengarang} · {value.tahun_terbit}</Typography>
                            <Typography className=' font-medium text-base md:text-base xl:text-lg '>{value.penerbit}</Typography>
                            <p className=' break-words'>{value.deskripsi}</p>

                            <div className={`mt-auto w-fit maxSm:mx-auto`}>
                            <Button className='w-fit mr-3' variant='text' onClick={ () => {openDialog(index)}}>Lihat Detail</Button>
                            <Button className='w-fit' onClick={() => {handleReturnDialog(value.id)}}>Kembalikan Buku</Button>
                            </div>
                            
                        </CardBody>
                    </Card>
                    ))}                
                </div>
            </div>


            <Dialog open={dialog} size={dialogSize} handler={() => {setDialog(!dialog)}}>
                    <DialogHeader className=' text-center justify-center'>{clickedBook.judul}</DialogHeader>
                    <DialogBody className=' flex flex-col'>
                        <img src={clickedBook.image_url} className=' w-44 md:w-52 xl:h-80 max-w-80 m-auto '></img>
                        <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-5'>
                            <div className='grow flex flex-col text-center'>
                                <p className='m-auto text-black font-medium'>Penerbit</p>
                                <p className='m-auto'>{clickedBook.penerbit}</p>
                            </div>
                            <div className='grow flex flex-col text-center'>
                                <p className='m-auto text-black font-medium'>Tahun Terbit</p>
                                <p className='m-auto'>{clickedBook.tahun_terbit}</p>
                            </div>
                            <div className='grow flex flex-col text-center'>
                                <p className='m-auto text-black font-medium'>Pengarang</p>
                                <p className='m-auto'>{clickedBook.pengarang}</p>                                
                            </div>
                            <div className='grow flex flex-col text-center'>
                                <p className='m-auto text-black font-medium'>ISBN</p>
                                <p className='m-auto'>{clickedBook.ISBN}</p>
                            </div>
                            <div className='grow flex flex-col text-center'>
                                <p className='m-auto text-black font-medium'>Jumlah Halaman</p>
                                <p className='m-auto'>{clickedBook.jumlah_halaman}</p>
                            </div>
                        </div>                        
                        <p className='text-center'>
                            {clickedBook.deskripsi}
                        </p>
                    </DialogBody>
                    <DialogFooter className=' justify-center'>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => {setDialog(!dialog)}}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                    <Button variant="gradient" color="blue" onClick={() => {handleReturnDialog(clickedBook.id)}}>
                        <span>Kembalikan Buku</span>
                    </Button>
                    </DialogFooter>
            </Dialog>

            <Dialog open={returnDialog} size={dialogSize} handler={() => {setReturnDialog((!returnDialog))}} className=' justify-center'>
                    <DialogHeader className=' text-center justify-center'>
                        {returnLoading ? 'Loading...' : `Confirm`}
                    </DialogHeader>
                    <DialogBody className=' flex flex-col text-center'>
                        {returnLoading 
                        ? (<div role="status " className="m-auto flex justify-center">
                                <svg aria-hidden="true" class="inline w-20  mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>)
                        : ''
                        }

                        {
                            returnError.code
                            ? `Error while processing reqest, Error data : ${returnError.data}`
                            : returnSuccess? 'Buku berhasil dikembalikan': 'Apakah anda yakin ingin mengembalikan buku ini?'
                        }
                    </DialogBody>
                    {
                        returnLoading
                        ? ''
                        : (
                            <DialogFooter className=' justify-center'>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={() => {setReturnDialog(!returnDialog)}}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>

                                {
                                    returnError.code || returnSuccess
                                    ? (
                                        <Button variant="gradient" color="blue" onClick={() => {setReturnSuccess(false);setReturnDialog(!returnDialog)}}>
                                            <span>Ok</span>
                                        </Button>
                                    )
                                    : (<Button variant="gradient" color="blue" onClick={() => {handleReturnBook()}}>
                                            <span>Ya</span>
                                        </Button>
                                        )
                                }
                                
                            </DialogFooter>
                        )
                    }
                    
            </Dialog>
            <FooterComp className=' '/>
            
        </div>
    );
}

export default MyBook;

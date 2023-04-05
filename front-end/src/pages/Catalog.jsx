import {useState, useEffect} from 'react';
import NavbarComp from '../components/NavbarComp';
import { Card, CardHeader, CardBody, Typography, Button, Dialog, DialogBody, DialogHeader, DialogFooter, Input } from "@material-tailwind/react";
import placeholderImg from '../assets/img/placeholderImg.png'
import useWindowDimensions from '../hooks/useWindowsDimensions';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Catalog = () => {
    const [dialog, setDialog] = useState(false);
    const [clickedBook, setClikedBook] = useState({ judul: 'No book Selected', image_url: 'No book Selected', tahun_terbit: 'No book Selected', penerbit: 'No book Selected', pengarang: 'No book Selected', deskripsi: 'No book Selected', ISBN: 'No book Selected', jumlah_halaman: 'No book Selected'});
    const {height, width } = useWindowDimensions()
    const [dialogSize, setDialogSize] = useState('xl');

    const axiosPrivate = useAxiosPrivate()
    const [dataBuku, setDataBuku] = useState([]);
    const [search, setSearch] = useState('');
    const onSearchChange = (ev) => {
        setSearch(ev.target.value)
        if (search === '') {onSearch()}
    } 

    const onSearch = async () => {
        try {
            const books = await axiosPrivate.get('/api/catalog', {
                params: {                    
                    page: '1',
                    size: '100',
                    query: search
                }
            })    
            const booksArray = books.data.booksData.booksArray
            setDataBuku(booksArray)
        } catch (error) {
            console.log(error)
        }
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
        onSearch()
        let input = document.getElementById('input')
        let btn = document.getElementById('searchBtn')
        const action = (ev) => {
            if (ev.key === 'Enter') {
                btn.click()
            }
        }
        input.addEventListener('keypress', action)

        return () => { input.removeEventListener('keypress', action)}
    }, []);

    return (
        <div className=' block '>
            <NavbarComp></NavbarComp>
            <div className=' pt-6 pb-4 px-6'>
                <Typography className="text-center mb-4" variant='h1'>
                    Telusuri Katalog
                </Typography>

                <div className="relative flex w-full max-w-[40rem] mx-auto" >
                    <Input
                        type="text"
                        label="Search"
                        value={search}
                        onChange={onSearchChange}
                        className="pr-20"
                        onSubmit={onSearch}
                        id='input'
                        containerProps={{
                        className: "min-w-0"                       
                        }}
                    />
                    <Button
                        size="sm"
                        color="blue"
                        /* disabled={!search} */
                        className="!absolute right-1 top-1 rounded capitalize"
                        onClick={onSearch}
                        id='searchBtn'
                    >
                        Cari
                    </Button>
                </div>
            </div>
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
                        <Button className='w-fit'>Pinjam Buku</Button>
                        </div>
                        
                    </CardBody>
                </Card>
                ))}                
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
                    <Button variant="gradient" color="blue" onClick={() => {setDialog(!dialog)}}>
                        <span>Pinjam Buku</span>
                    </Button>
                    </DialogFooter>
                </Dialog>
        </div>
    );
}

export default Catalog;

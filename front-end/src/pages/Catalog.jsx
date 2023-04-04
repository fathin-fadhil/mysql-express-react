import {useState} from 'react';
import NavbarComp from '../components/NavbarComp';
import { Card, CardHeader, CardBody, Typography, Button, Dialog, DialogBody, DialogHeader, DialogFooter } from "@material-tailwind/react";
import placeholderImg from '../assets/img/placeholderImg.png'
import useWindowDimensions from '../hooks/useWindowsDimensions';


const dataBuku = [
    {
        judul: 'Thus Spoke Zarathustra',
        image_url: "https://books.google.co.id/books/publisher/content?id=2jFBDwAAQBAJ&hl=id&pg=PP1&img=1&zoom=3&bul=1&sig=ACfU3U3YmAN8XFIskaZdWrpxtPb1BqmOyw&w=1280",
        tahun_terbit: '2017',
        penerbit: 'Lulu.com',
        pengarang: 'Friedrich Wilhelm Nietzsche',
        deskripsi: "Thus Spoke Zarathustra is a foundational work of Western literature and is widely considered to be Friedrich Nietzsche's masterpiece. It includes the German philosopher's famous discussion of the phrase 'God is dead' as well as his concept of the Superman. Nietzsche delineates his Will to Power theory and devotes pages to critiquing Christian thinking, in particular Christianity's definition of good and evil.",
        ISBN: '9781387401512, 1387401513',
        jumlah_halaman: '232'
    },
    {
        judul: 'The Rebel: An Essay on Man in Revolt',
        image_url: "https://books.google.co.id/books/content?id=t_3yQrhdxwUC&hl=id&pg=PR4&img=1&zoom=3&sig=ACfU3U2uvlaGpx2rJvhdigPNrPWxqOk5_w&w=1280",
        tahun_terbit: '2012',
        penerbit: 'Knopf Doubleday Publishing Group',
        pengarang: 'Albert Camus',
        deskripsi: "By one of the most profoundly influential thinkers of our century, The Rebel is a classic essay on revolution. For Albert Camus, the urge to revolt is one of the 'essential dimensions' of human nature, manifested in man's timeless Promethean struggle against the conditions of his existence, as well as the popular uprisings against established orders throughout history. And yet, with an eye toward the French Revolution and its regicides and deicides, he shows how inevitably the course of revolution leads to tyranny. As old regimes throughout the world",
        ISBN: '0307827836, 9780307827838',
        jumlah_halaman: '320'
    },
]

const Catalog = () => {
    const [dialog, setDialog] = useState(false);
    const [clickedBook, setClikedBook] = useState({
        judul: 'No book Selected',
        image_url: 'No book Selected',
        tahun_terbit: 'No book Selected',
        penerbit: 'No book Selected',
        pengarang: 'No book Selected',
        deskripsi: 'No book Selected',
        ISBN: 'No book Selected',
        jumlah_halaman: 'No book Selected'
    });

    const {height, width } = useWindowDimensions()
    console.log(width)
    const [dialogSize, setDialogSize] = useState('xl');
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

    return (
        <div className=' block'>
            <NavbarComp></NavbarComp>
            <div className='grid grid-cols-1 customDesktopBp:grid-cols-2 mt-10 px-4'>
                {dataBuku.map((value, index) => (
                <Card shadow={false} className='flex maxSm:flex-col flex-row p-4 shadow-lg bg-blue-gray-50 m-3 maxSm:text-center maxSm:items-center py-6'>
                    <CardHeader className='m-0 flex-shrink-0  h-fit my-auto w-fit mb-4 '>
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
        </div>
    );
}

export default Catalog;

import React from 'react';
import NavbarComp from '../components/NavbarComp';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import placeholderImg from '../assets/img/placeholderImg.png'

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
    return (
        <div className=' block'>
            <NavbarComp></NavbarComp>
            <div className='grid grid-cols-1 customDesktopBp:grid-cols-2 mt-10 px-4'>
                {/* <Card shadow={false} className='flex flex-row p-4 shadow-lg'>
                    <CardHeader className='m-0 flex-shrink-0  h-fit my-auto'>
                        <img src={placeholderImg} className=' h-44 md:h-52 xl:h-80 max-h-80 '></img>
                    </CardHeader>
                    <CardBody className='flex flex-col pl-4 py-0 flex-shrink overflow-clip flex-grow'>
                        <Typography className=' font-bold text-black text-xl md:text-3xl xl:text-3xl '>The Absurd</Typography>
                        <Typography className=' font-medium text-base md:text-base xl:text-lg '>Albert Camus · 2022</Typography>
                        <Typography className=' font-medium text-base md:text-base xl:text-lg '>PT Cinta Sejahtera</Typography>
                        <p className=' break-words'>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa </p>

                        <Button className='mt-auto w-fit'>Pinjam Buku</Button>
                    </CardBody>
                </Card> */}
                {dataBuku.map((value, index) => (
                    <Card shadow={false} className='flex flex-row p-4 shadow-lg bg-blue-gray-50 m-3'>
                    <CardHeader className='m-0 flex-shrink-0  h-fit my-auto'>
                        <img src={value.image_url} className=' h-44 md:h-52 xl:h-80 max-h-80 '></img>
                    </CardHeader>
                    <CardBody className='flex flex-col pl-4 py-0 flex-shrink overflow-clip flex-grow'>
                        <Typography className=' font-bold text-black text-xl md:text-3xl xl:text-3xl '>{value.judul}</Typography>
                        <Typography className=' font-medium text-base md:text-base xl:text-lg '>{value.pengarang} · {value.tahun_terbit}</Typography>
                        <Typography className=' font-medium text-base md:text-base xl:text-lg '>{value.penerbit}</Typography>
                        <p className=' break-words'>{value.deskripsi}</p>

                        <Button className='mt-auto w-fit'>Pinjam Buku</Button>
                    </CardBody>
                </Card>
                ))}
            </div>
        </div>
    );
}

export default Catalog;

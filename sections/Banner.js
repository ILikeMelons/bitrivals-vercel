import { coingecko, nomics, coinmarketcap, certik } from "../public";
import Container from "../components/Container";
import Link from 'next/link'

const icons = [
    {
        image : certik.src,
        height : '30px',
        className: 'mt-3',
        link: 'https://www.certik.org/projects/bit-rivals'
    },
    {
        image : coinmarketcap.src,
        height: '30px',
        className: 'mt-3',
        link: 'https://coinmarketcap.com/'
    },
    {
        
        image : coingecko.src,
        height : '36px',
        className: 'mt-3',
        link: 'https://www.coingecko.com/en'
    },
    {
        image : nomics.src,
        height : '30px',
        className: 'mt-3',
        link: 'https://nomics.com/'
    }
]
const Banner = () => {
    return (
        <div className='w-full align-items-center'>
            <Container className="items-center justify-between grid-cols-2 pt-0 pb-2 md:pt-4 grids md:grid-cols-4 inner align-center">
            {
                icons.map((icon, index) => {
                    return (
                        <Link href={icon.link}  key={'bannerIcon' + index}>
                            <a target="_blank" rel="noreferrer" >
                                <img src={ icon.image } style={{ height:icon.height }} className={'w-auto h-fill align-baseline m-auto ' + icon.className}/>
                            </a>
                        </Link>
                    )
                })
            }
            </Container>
           
        </div>
    )
}

export default Banner;
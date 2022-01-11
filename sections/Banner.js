import { coingecko, nomics, coinmarketcap, certik, yahoo, marketwatch, nanuque } from "../public";
import Container from "../components/Container";
import Link from 'next/link'

const icons = [
    {
        image : nanuque.src,
        height: '50px',
        className: 'mt-3',
        link: 'https://nanuqe.com/bit-rivals/'
    },
    {
        image : certik.src,
        height : '30px',
        className: 'mt-3 sm:pr-4',
        link: 'https://www.certik.org/projects/bit-rivals'
    },
    
    {
        
        image : yahoo.src,
        height : '30px',
        className: 'mt-4 sm:pr-4',
        link: 'https://finance.yahoo.com/news/bit-rivals-rewards-playing-favorite-140000474.html'
    },
    {
        image : marketwatch.src,
        height : '28px',
        className: 'mt-3',
        link: 'https://www.marketwatch.com/press-release/bit-rivals-rewards-you-for-playing-your-favorite-games-presale-starts-january-21-2022-01-10?tesla=y'
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


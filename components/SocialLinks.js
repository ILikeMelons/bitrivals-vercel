import { defaultConfig } from "next/dist/server/config-shared"
import Image from 'next/image'
import Link from 'next/link'
import { discord, github, telegram, twitter, instagram, reddit } from '../public/socials'

const links = [
    {
        image : discord.src,
        link : 'https://discord.gg/nc7ST6eP'
    },
    {
        image : telegram.src,
        link : 'https://t.me/bitrivals'
    },
    {
        image : twitter.src,
        link : 'https://twitter.com/bitrivals'
    },
    {
        image : instagram.src,
        link : 'https://www.instagram.com/bitrivals/'
    },
    {
        image : reddit.src,
        link : 'https://www.reddit.com/r/bitrivals/'
    },
    {
        image : github.src,
        link : 'https://www.github.com/bitrivals'
    }
]

const SocialLinks = () => {
    return (
        <div className='flex flex-row space-x-5'>
            {
                links.map((link, index) => {
                    return (
                        <div key={'socialLink' + index}>
                            <Link href={link.link}  target="_blank" rel="noreferrer">
                                <a target="_blank" rel="noreferrer" >
                                    <Image index={'link'+index} src={link.image} height={`22vh`} width={`22vh`} className="cursor-pointer" />
                                </a>
                            </Link> 
                        </div>
                    )
                })
            }
        </div>
    )
}


export default SocialLinks;
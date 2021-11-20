import {medal, wallet, certik_big} from '../../public'
import handleViewport from "react-in-viewport";
import Button from '../Button';

const items = [
    {
        fullrow : true,
        title : "AUDIT in progress by certik, THE WORLD LEADERS IN CRYPTO SECURITY",
        text : "The audit assesses the code and underlying structure of the $RIVAL smart contract. It ensures that the smart contract is free of exploits and potential vulnerabilities. This in-depth audit will be completed by a team of blockchain experts at CertiK, one of the world's leading blockchain security providers." 
    },
    {
        topIcon : wallet.src,
        fullrow : false,
        title : 'Zones are Funded by our Rival Reserve wallet',
        text : 'The 1% fee on every $RIVAL token transaction goes to fund the Rival Reserve Wallet. All of these tokens are redistributed back to gamers through the tournament and Play to Earn systems. None of the tokens gained through the transaction fee will go to the team or development, ensuring the fairest distribution to gamers.',
        link : '/token'
    },
    {
        topIcon: medal.src,
        fullrow : false,
        title : 'Be rewarded for playing your favourite video games',
        text : 'In addition to $RIVAL tokens, users on the Bit Rivals platform will have the opportunity to earn Rival points by participating in tournaments or playing public matches of their favorite games through our unique Play to Earn model. Points can be used to level up on the Bit Rivals platform, exchanged for raffle tickets, NFTs, or $RIVAL tokens, and unlock unique achievements and badges.',
        link : '/our squad',
        scroll : true
    }
]

const Block = (props) => {
	const { inViewport, forwardedRef } = props;
	const opacity = inViewport ? 1 : 0;
	const position = inViewport ? 0 : 100;

    const getClassNames = () => {
        let classNames = ['grid  md:grid-cols-2 md:gap-x-24 gap-y-12 pt-10 md:gap-y-52 '];
        props.className && classNames.push(props.className)
        return classNames.join(' ')
    }

    return (
        <div className={getClassNames() + ' transition-all duration-1000 delay-150'} ref={forwardedRef}
        style={{ opacity: opacity, transform: `translateY(${position}px)` }}
        >
          <div className='relative block pb-10 md:hidden'>
            <a href="https://www.certik.org/projects/bit-rivals" target="_blank" rel="noreferrer">
                <img src={certik_big.src} className='absolute w-4/6 opacity-100 md:w-auto inset-y-1/3 md:opacity-0' />
            </a>
          </div>
            {
                items.map((item, index) => {
                    return (
                        <GridItem key={item.title + index} title={item.title} topIcon={item.topIcon} fullrow={item.fullrow} text={item.text} link={item.link}  /> 
                    );
                })
            }
        </div>
    );
};
	
const ViewportBlock = handleViewport(Block);


const GridItem = (props) => {
    const {title, topIcon, fullrow, text, link  } = props;
    return (
        <div className={'relative w-full text-white ' + (fullrow ? ' md:col-span-2' : '' )}>
            {topIcon !== undefined ?  <div className='w-20 h-20'> <img src={topIcon} /> </div>  : ''}
            <h1 className='font-semibold uppercase font-morgan text-25px md:text-30px md:max-w-sm'>
                {title}
            </h1>
            <p className={'pt-5 md:max-w-lg text-14px' + (fullrow ? ' md:pr-20' : '' )}>
                {text}
            </p>

            {
                fullrow ? 
                    <div className='flex flex-row pt-6 space-x-5 grayscale'>
                        <Button text="Read the audit" blank={true} iconAfter={true} href="https://www.certik.org/projects/bit-rivals" />
                        <Button text="About CertiK" blank={true} iconAfter={true} href="https://www.certik.org/" />
                        <a href="https://www.certik.org/projects/bit-rivals" target="_blank" rel="noreferrer">
                            <img src={certik_big.src} className='absolute right-0 w-5/12 h-auto opacity-0 md:w-80 lg:w-96 inset-y-1/3 md:opacity-100' />
                        </a>
                    </div> : 
                    <div className='flex flex-row pt-6 space-x-5'>
                        <Button text="Learn more" iconAfter={true} href={link} />
                    </div>
            }
        </div>
    )
}


const WhyGrid = (props) => {
    return (
        <ViewportBlock />
    );
}

export default WhyGrid;
import {medal, wallet, certik_big} from '../../public'
import handleViewport from "react-in-viewport";
import Button from '../Button';

const items = [
    {
        fullrow : true,
        title : "Audited by certik, THE WORLD LEADERS IN CRYPTO SECURITY",
        text : "The audit assesses the code and underlying structure of the $RIVAL smart contract. It ensures that the smart contract is free of exploits and potential vulnerabilities." ,
        text2 : "An In-depth audit was completed by a team of blockchain experts at CertiK, one of the world's leading blockchain security providers."
    },
    {
        topIcon : wallet.src,
        fullrow : false,
        title : 'KYC by Nanuque',
        text : 'Our team members official government identity documents were verified by the Nanuqe team, including a full interview of the project and an in-depth PEP and sanctions check.',
        link : 'https://nanuqe.com/bit-rivals/',
        blank: true
    },
    {
        topIcon: medal.src,
        fullrow : false,
        title : 'Official LLC',
        text : 'Bit Rivals LLC is a legally-protected entity in Saint Vincent and the Grenadines (SVG)'
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
                        <GridItem key={item.title + index} title={item.title} topIcon={item.topIcon} fullrow={item.fullrow} text2={item.text2} text={item.text} space={item.space} blank={item.blank} link={item.link}  /> 
                    );
                })
            }
        </div>
    );
};
	
const ViewportBlock = handleViewport(Block);


const GridItem = (props) => {
    const {title, topIcon, fullrow, text, link, text2, blank  } = props;
    return (
        <div className={'relative w-full text-white ' + (fullrow ? ' md:col-span-2' : '' )}>
            {topIcon !== undefined ?  <div className='w-20 h-20'> <img src={topIcon} /> </div>  : ''}
            <h1 className='font-semibold uppercase font-morgan text-25px md:text-30px md:max-w-sm'>
                {title}
            </h1>
            <p className={'pt-5 md:max-w-lg text-14px' + (fullrow ? ' md:pr-20' : '' )}>
                {text}
                { text2 ? <><br/><br/></> : "" }
                {text2}
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
                        <Button text="Learn more" iconAfter={true} href={link} blank={blank}/>
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
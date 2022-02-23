import { Carousel } from '@trendyol-js/react-carousel';
import Image from "next/image";
import RedTri from '../public/images/icons/red_tri.svg'
import handleViewport from "react-in-viewport";
import useWindowDimensions from "../hooks/useWindowDimensions";

const phases = {
    phase1: {
        name: 'Phase One',
        title : 'Yu',
        items : [
            'Website design and build',
            'Website launch',
            'Smart contract finalization',
            'Official audit',
            'Whitepaper release',
            'Token creation',
            'Official socials creation',
            'Referral program',
            'Giveaways',
            'Presale ads',
            'Presale',
            'Public launch on PancakeSwap'
        ]
    },
    phase2: {
        name: 'Phase Two',
        title : 'Freeman',
        items : [
            'Airdrop program',
            'Goingecko listing',
            'CoinMarketCap listing',
            'Digital ad campaign',
            'Influencer marketing',
            'Giveaways',
            'Official merch store available',
            'Social media growth',
            'Rival Swap launch',
            'Staking/LP Farming available',
            'CEX listings',
        ]
    },
    phase3: {
        icon  : '',
        name: 'Phase Three',
        title : 'Valentine',
        items : [
            'Rival Arena design & beta build',
            'Rival ID full launch with profile',
            'Rival Arena closed beta',
            'Rival Arena launch',
            'Official showcase tournaments',
            'Rival Roster launch',
            'ETH/MATIC/ADA bridges',
            'Rival Loot design & beta build',
            'Rival Loot closed beta',
            'Official design/art competition',
            'Featured artist program',
            'Rival Loot launch',

        ]
    },
    phase4: {
        name: 'Phase Four',
        title : 'Croft',
        items : [
            'Tournament casting',
            'Desktop app beta',
            'Desktop app launch',
            'Mobile app design & launch',
            'Rival Rewards launch',
            'Wallet/swap app integration',
            'Twitch tipping integration',
            'Fiat on-ramp integration',
            'Partnership with games studios',
            'Funding indie games',
            'We sponsor a pro eSports team',
        ]
    }
}

const Block = (props) => {
	const { inViewport, forwardedRef } = props;
	const opacity = inViewport ? 1 : 0;
	const position = inViewport ? 0 : 100;
	const { width } = useWindowDimensions();
    const tileCount = width <= 768 ? 1 : 4;
    
	return (
        <div className="relative w-full transition-all duration-700 delay-100 roadmapSlider" ref={forwardedRef} style={{ opacity: opacity, transform: `translateY(${position}px)` }}>
            <Carousel className="transition-all duration-700" show={tileCount} swiping={true} swipeOn={0.1} infinite={false}  >
                {
                    Object.keys(phases).map((phase, index) => {
                        return (
                            <div key={'PHASE' + index} className="pt-48 pl-3 border-l-2 border-black-100 md:pt-40 -mt-52 md:pb-40 md:mb-0" style={{ opacity: 1 }}>
                                <Image src={'/images/icons/phase-' + phases[phase].title.toLowerCase() + '.svg'} width={`36vw`} height={`36vw`} />
                                <h3 className="mt-2 text-xs uppercase text-yellow">{phases[phase].name}</h3>
                                <h4 className="text-2xl uppercase text-pink font-morgan">{phases[phase].title}</h4>
                                <ul className="mt-3 space-y-2">
                                    {
                                        phases[phase].items.map((item,index) => {
                                            return(<li key={'PHASEITEM' + index} className="text-white text-14px"><Image src={RedTri.src} width={`10vw`} height={`10vw`} /><span className="ml-2">{item}</span></li>)
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
	);
};
	
const ViewportBlock = handleViewport(Block);



const RoadmapSlider = () => {
    return (
        <>
            <ViewportBlock />
        </>
    )
}


export default RoadmapSlider;
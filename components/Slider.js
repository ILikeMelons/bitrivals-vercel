import { defaultConfig } from "next/dist/server/config-shared"
import Container from "../components/Container";
import { Carousel } from '@trendyol-js/react-carousel';
import { union_red_small } from '../public/absolutes'
import handleViewport from "react-in-viewport";
import useWindowDimensions from "../hooks/useWindowDimensions";

const tiles = ['apex legends', 'league of legends', 'valorant', 'call of duty warzone', 'counter strike', 'player unknowns battlegrounds', 'dota 2', 'fortnite', 'starcraft II', 'rocket league', 'overwatch', 'hearthstone', 'arena of valor', 'super smash bros', 'rainbow 6 siege']

const Block = (props) => {
	const { inViewport, forwardedRef } = props;
	const opacity = inViewport ? 1 : 0;
	const position = inViewport ? 0 : 100;
    const { height, width } = useWindowDimensions();
    const tileCount = width <= 768 ? 1.2 : 5.5;

	return (
        <div className="relative w-full transition-all duration-700 delay-100" ref={forwardedRef} style={{ opacity: opacity, transform: `translateY(${position}px)` }}>
            <h4 className="-mb-2 text-yellow">Compatible games</h4>
            <Carousel className="transition-all duration-700" show={tileCount} swiping={true} swipeOn={0.1} infinite="false"  >
                {
                    tiles.map((game, index) => {
                        return (
                            <div key={'GAME' + index} className="pr-3 tile" style={{ opacity: 1 }}>
                                <div className="relative py-48 overflow-hidden" >
                                <div className="absolute inset-0 bg-cover tile_bg" style={{backgroundImage: `url('images/tiles/${game.split(' ').join('')}-bg.png')`}}></div>
                                <h4 className="absolute left-0 right-0 w-1/2 pt-24 m-auto leading-4 text-center capitalize transition-all duration-200 opacity-0 top-1/2 text-14px text-yellow" >{game}</h4>
                                <div className="absolute inset-0 tile_overlay"></div>
                                <img className="absolute tile_trim -right-0 -top-40 w-80 max-w-none" src={union_red_small.src} /> 
                                <img className="absolute left-0 right-0 m-auto transform -translate-y-1/2 top-1/2 tile_logo" src={`logos/${game.split(' ').join('')}.svg`} /> 
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
	);
};
	
const ViewportBlock = handleViewport(Block);



const Slider = () => {
    return (
        <Container className="relative z-10 flex-wrap extended">
            <ViewportBlock />
        </Container>
    )
}


export default Slider;
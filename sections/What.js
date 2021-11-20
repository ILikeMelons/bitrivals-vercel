import Container from "../components/Container";
import { Parallax, Background } from "react-parallax";
import { square_outline_yellow, triangle_outline_pink, cross_solid_yellow } from "../public/shapes";
import Slider from "../components/Slider";
import Title from "../components/Blocks/Title";
import handleViewport from "react-in-viewport";

const titleBlock = (props) => {
	const {inViewport, forwardedRef} = props;
	const opacity = inViewport ? 0.2 : 0;
	const position = inViewport ? 0 : 100;
    return ( <>
			<Title title={"WHAT IS \nBIT RIVALS?"} description={"Bit Rivals is a tailor-made ecosystem, built for gamers and crypto enthusiasts. Get rewarded for playing your favourite games, compete in tournaments, form your team, connect with new players, mint your own NFTs, earn passive income, and more."} inViewport={inViewport} forwardedRef={forwardedRef} />
		</>
        
    )
}

const ViewportBlock = handleViewport(titleBlock, { threshold: .5 });

const What = () => {
	return (
		<section id="about">
			<Container className="relative flex-wrap pb-0 inner">
				

			<Parallax
              renderLayer={percentage => (
                <div className="block md:hidden" style={{
				  width: "51px",
				  height: "56px",
                  background: `url(${triangle_outline_pink.src})`,
                  position: 'absolute',
                  top: `${200 - (percentage * 110)}px`,
                  left: '240px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 300}deg)`
                }} />
              )}
            >
            </Parallax>

			<Parallax
              renderLayer={percentage => (
                <div className="block md:hidden" style={{
				  width: "50px",
				  height: "50px",
                  background: `url(${square_outline_yellow.src})`,
                  position: 'absolute',
                  top: `${940 - (percentage * 110)}px`,
                  left: '40px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 300}deg)`
                }} />
              )}
            >
            </Parallax>
			
				<Parallax
					renderLayer={(percentage) => (
						<div
							style={{
								width: "46px",
								height: "52px",
								background: `url(${triangle_outline_pink.src})`,
								position: "absolute",
								top: `${300 - percentage * 230}px`,
								left: "-140px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 110}deg)`,
							}}
						/>
					)}
				></Parallax>

				<Parallax
					renderLayer={(percentage) => (
						<div
							style={{
								width: "46px",
								height: "46px",
								background: `url(${square_outline_yellow.src})`,
								position: "absolute",
								top: `${percentage * 230}px`,
								left: "940px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 150}deg)`,
							}}
						/>
					)}
				></Parallax>
				
				<h3 className="hidden pointer-events-none font-vtf text-120px text-stroke md:block">
					WHAT IS <br />
					BIT RIVALS?
				</h3>
				<div className="mb-10 breaker"></div>

				<ViewportBlock />
			</Container>
			<Slider />
			<div className="clear-both"></div>
		</section>
	);
};

export default What;

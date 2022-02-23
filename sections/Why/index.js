import React from 'react';
import Container from "../../components/Container";
import Title from "../../components/Blocks/Title"
import ReasonGrid from '../../components/Grids/ReasonGrid'
import { Parallax, Background } from "react-parallax";
import { circle_solid_white, cross_solid_yellow, square_outline_yellow, triangle_outline_pink } from "../../public/shapes";
import handleViewport from "react-in-viewport";
import style from './style.module.css'

const titleBlock = (props) => {
	const {inViewport, forwardedRef} = props;
	const opacity = inViewport ? 0.2 : 0;
	const position = inViewport ? 0 : 100;
    return ( <>
			<Title title={"WHY\nBIT RIVALS"} description={"Gaming shouldn't just be fun; it should also be rewarding. Bit Rivals offers every player a way to earn rewards and generate passive income, no matter their skill level, all through the power of blockchain technology. We strive to bring a unique blend of Play-to-Earn and Play-to-Win systems to reward players at the top of their game, while making sure that no player is left behind."} inViewport={inViewport} forwardedRef={forwardedRef} />
		</>
    )
}
	
const ViewportBlock = handleViewport(titleBlock);

const Why = (props) => {
	const { inViewport, forwardedRef } = props;

	return (
		<section className='relative -mt-12' id="why">
			 
			<Container className="relative flex-wrap inner" >
			
				<Parallax
					renderLayer={(percentage) => (
						<div className={'z-10'}
							style={{
								width: "46px",
								height: "46px",
								background: `url(${square_outline_yellow.src})`,
								position: "absolute",
								top: `${200 + (percentage * 110)}px`,
								left: "940px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 30}deg)`,
							}}
						/>
					)}
				></Parallax>

				<Parallax
					renderLayer={(percentage) => (
						<div className={'z-10'}
							style={{
								width: "24px",
								height: "24px",
								background: `url(${circle_solid_white.src})`,
								position: "absolute",
								top: `${450 - (percentage * 160)}px`,
								left: "-130px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 0}deg)`,
							}}
						/>
					)}
				></Parallax>

				<Parallax
					renderLayer={(percentage) => (
						<div className
							style={{
								width: "47px",
								height: "47px",
								background: `url(${cross_solid_yellow.src})`,
								position: "absolute",
								bottom: `${250 - (percentage * 160)}px`,
								left: "-150px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 130}deg)`,
							}}
						/>
					)}
				></Parallax>

			<Parallax
              renderLayer={percentage => (
                <div className="block md:hidden" style={{
				  width: "47px",
				  height: "47px",
                  background: `url(${cross_solid_yellow.src})`,
                  position: 'absolute',
                  top: `${440 - (percentage * 110)}px`,
                  left: '280px',
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
				  height: "57px",
                  background: `url(${triangle_outline_pink.src})`,
                  position: 'absolute',
                  top: `${1200 - (percentage * 110)}px`,
                  left: '40px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 300}deg)`
                }} />
              )}
            >
            </Parallax>
                
				<h3 className={"hidden md:block pointer-events-none font-vtf text-120px positionText z-0 " + style.backgroundText}>
					WHY <br />
					BIT RIVALS?
				</h3>
				
				<div className={"absolute w-screen bg-contain -bottom-32 left-10 " + style.heroMask} style={{background: "linear-gradient(216deg, rgb(18 24 37) 23%, rgb(18 24 37 / 0%) 100%), url('images/bg/heroImage02.jpg')"}}></div>
				<ViewportBlock />
				
				<ReasonGrid className='pt-28'/>
				
				<div className="mt-12 -mb-10 md:-mb-12 md:mt-32 breaker"></div>
			</Container>
			
		</section>
	);
};

export default Why;

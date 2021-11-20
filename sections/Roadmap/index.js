import React from 'react';
import Container from "../../components/Container";
import Title from "../../components/Blocks/Title"
import { Parallax } from "react-parallax";
import handleViewport from "react-in-viewport";
import style from './style.module.css'
import RoadmapSlider from '../../components/RoadmapSlider';
import { triangle_outline_pink, cross_solid_yellow } from '../../public/shapes';

const titleBlock = (props) => {
	const {inViewport, forwardedRef} = props;
	const opacity = inViewport ? 0.2 : 0;
	const position = inViewport ? 0 : 100;
    return ( <div className="mb-12 md:mb-0">
			<Title title={"Roadmap"} description={"Bit Rivals is constantly evolving and improving. Our phased approach means that updates are broken down into realistic, achievable goals. Take a look at what the journey ahead looks like."} inViewport={inViewport} forwardedRef={forwardedRef} />
		</div>
    )
}
	
const ViewportBlock = handleViewport(titleBlock);

const Roadmap = (props) => {
	const { inViewport, forwardedRef } = props;

	return (
		<section className='relative' id="roadmap">
			<Container className="relative flex-wrap inner">
			<Parallax
              renderLayer={percentage => (
                <div className="block md:hidden" style={{
				  width: "48px",
				  height: "48px",
                  background: `url(${cross_solid_yellow.src})`,
                  position: 'absolute',
                  top: `${700 - (percentage * 110)}px`,
                  left: '280px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 300}deg)`
                }} />
              )}
            >
            </Parallax>
				<Parallax
					renderLayer={(percentage) => (
						<div className="z-20"
							style={{
								width: "51px",
								height: "58px",
								background: `url(${triangle_outline_pink.src})`,
								position: "absolute",
								top: `${250 - (percentage * 160)}px`,
								left: "1000px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 170}deg)`,
							}}
						/>
					)}
				></Parallax>
				
				<h3 className={"pointer-events-none font-vtf text-120px positionText hidden md:block z-0 " + style.backgroundText}>
					Roadmap
				</h3>
		
				<ViewportBlock />
				
				<RoadmapSlider />
				
			</Container>
		</section>
	);
};

export default Roadmap;

import React from 'react';
import Container from "../../components/Container";
import NewsLetter from '../../components/Newsletter';
import TeamComponent from '../../components/Team/Team'
import SocialLinks from '../../components/SocialLinks'
import Title from "../../components/Blocks/Title"
import handleViewport from "react-in-viewport";
import style from './style.module.css'
import Button from '../../components/Button'
import { Parallax } from 'react-parallax';
import { circle_solid_white, square_solid_pink } from '../../public/shapes';

const titleBlock = (props) => {
	const {inViewport, forwardedRef} = props;
	const opacity = inViewport ? 0.2 : 0;
	const position = inViewport ? 0 : 100;
    return ( <div className='relative z-10 bg-black-50' style={{boxShadow: "670px 0px 0px #121825"}}>
			<Title title={"OUR SQUAD"} description={"We are a team of professionals with many years collective experience in design, UI/UX, blockchain technologies, web development, marketing, social media, videography, game development and more."} inViewport={inViewport} forwardedRef={forwardedRef} />
            <div className='right-0 z-20 flex mt-4 md:absolute bottom-24 md:mt-0'>
            	<Button iconAfter={true} text='Join the team' blank={true} href="https://angel.co/company/bit-rivals-1/jobs"/> 
            </div>
        </div>
        
    )
}
	
const ViewportBlock = handleViewport(titleBlock);

const Squad = (props) => {
	const { inViewport, forwardedRef } = props;

	return (
		<section className='relative md:-mt-52' id="our squad">

			<Container className="relative flex-wrap inner">

			<Parallax
              renderLayer={percentage => (
                <div className="block md:hidden" style={{
				  width: "24px",
				  height: "24px",
                  background: `url(${circle_solid_white.src})`,
                  position: 'absolute',
                  top: `${590 - (percentage * 110)}px`,
                  left: '40px',
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
							width: "22px",
							height: "22px",
							background: `url(${circle_solid_white.src})`,
							position: "absolute",
							top: `${250 - (percentage * 160)}px`,
							left: "1000px",
							backgroundSize: "cover",
							transform: `rotate(${percentage * 170}deg)`,
						}}
					/>
				)}
			></Parallax>
			<Parallax
				renderLayer={(percentage) => (
					<div className="z-20"
						style={{
							width: "49px",
							height: "49px",
							background: `url(${square_solid_pink.src})`,
							position: "absolute",
							top: `${250 + (percentage * 160)}px`,
							left: "-100px",
							backgroundSize: "cover",
							transform: `rotate(${percentage * 170}deg)`,
						}}
					/>
				)}
			></Parallax>

				<h3 className={"hidden md:block font-vtf text-120px " + style.backgroundText }>
					OUR<br />
					SQUAD
				</h3>
				
				<ViewportBlock />
				
				<div className="w-full ">
					<TeamComponent />
				</div>
				
				<div className='mt-12 md:absolute bottom-96 left-32 md:mt-0'>
					<p className='mb-2 font-bold font-morgan text-yellow text-38px'>JOIN IN THE CONVERSATION</p>
					<p className='max-w-xs pb-5 mb-4 font-semibold text-white text-14px'>Become a member of our constantly growing communities. </p>
					
					<SocialLinks />
					
				</div>
				

			</Container>

			<Container>
			<NewsLetter />
			</Container>
            
		</section>
	);
};

export default Squad;

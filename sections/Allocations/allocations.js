import React from 'react';
import Container from "../../components/Container";
import Title from "../../components/Blocks/Title"
import Image from 'next/dist/client/image';
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
			<Title title={"ALLOCATIONS"} description={"Created with the help of experienced blockchain engineers and economists, the $RIVAL token will be allocated in a manner that is fair to the token holder and ensures longevity of the project."} inViewport={inViewport} forwardedRef={forwardedRef} />
		</>
    )
}
	
const ViewportBlock = handleViewport(titleBlock);

const Allocations = (props) => {
	const { inViewport, forwardedRef } = props;

	return (
		<section className='relative -mt-12' id="allocations">
			 
			<Container className="relative flex-wrap inner" >
				<h3 className={"hidden md:block pointer-events-none font-vtf text-120px positionText z-0 " + style.backgroundText}>
					Allocations
				</h3>
				
				<ViewportBlock />

				<div className="relative flex flex-col-reverse justify-between w-full mt-12 md:flex-row gap-x-12 gap-y-12 md:gap-y-0 md:mt-0">
					<div className="flex items-center">
						<div className="grid w-full h-auto grid-cols-2 gap-y-8 gap-x-12">
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#FB385B'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">40%</span></div>
								<div className="text-white text-14px">Staking/LP Rewards</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#C838FB'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">5%</span></div>
								<div className="text-white text-14px">Marketing</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#7738FB'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">6%</span></div>
								<div className="text-white text-14px">Team allocation</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#3C38FB'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">7%</span></div>
								<div className="text-white text-14px">Rival Reserve</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#38B5FB'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">4%</span></div>
								<div className="text-white text-14px">Development</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#00D897'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">3%</span></div>
								<div className="text-white text-14px">Investors</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#F9BA3F'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">25%</span></div>
								<div className="text-white text-14px">Presale</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#F5752D'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">10%</span></div>
								<div className="text-white text-14px">Initial LP</div>
							</div>
						</div>
						</div>
					<div>
						<img src={'/images/charts/allocations.svg'} width={`100%`} height={`100%`} className=" bg-black-50" />
					</div>
				</div>
				<div className="mt-12 mb-4 md:mb-10 md:mt-36 breaker"></div>
				
			</Container>
			
		</section>
	);
};

export default Allocations;

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

				<div className="relative flex flex-col-reverse justify-between w-full mt-12 md:flex-row gap-x-8 gap-y-12 md:gap-y-0 md:mt-0">
					<div className="flex items-center">
						<div className="grid w-full h-auto grid-cols-2 gap-y-8 gap-x-12">
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#1e2161', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#3935eb'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">25%</span></div>
								<div className="text-white text-14px">Rewards</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#6c5730', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#f1b43e'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">12%</span></div>
								<div className="text-white text-14px">Private sale</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#713f28', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#e36d2c'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">10%</span></div>
								<div className="text-white text-14px">Public sale</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#466024', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#a9e132'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">6%</span></div>
								<div className="text-white text-14px">PCS liquidity</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#2e2161', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#7236f0'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">5%</span></div>
								<div className="text-white text-14px">Advisors / Partners</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#3e2058', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#bb37ed'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">6%</span></div>
								<div className="text-white text-14px">Team allocations</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#204e6d', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#34a5e6'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">5%</span></div>
								<div className="text-white text-14px">Development</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#0b6352', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#04b382'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">5%</span></div>
								<div className="text-white text-14px">Marketing</div>
							</div>
							<div className="flex items-center">
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#5d1e49', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#e82dca'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">3%</span></div>
								<div className="text-white text-14px">CEX liquidity</div>
							</div>
							<div className="flex items-center" style={{}}>
								<div className="relative flex-shrink-0 w-10 h-10 mr-3" style={{'background': '#642438', borderStyle: 'solid', borderWidth: '2px', borderRadius:'7px', borderColor:'#c93150'}}><span className="absolute block w-full text-center text-white transform -translate-y-1/2 top-1/2 text-12px">23%</span></div>
								<div className="text-white text-14px">Staking/LP Rewards</div>
							</div>
						</div>
						</div>
					<div>
						<img src={'/images/charts/allocations_graph.png'} width={`100%`} height={`100%`} className=" bg-black-50" />
					</div>
				</div>
				<div className="mt-12 mb-4 md:mb-10 md:mt-36 breaker"></div>
				
			</Container>
			
		</section>
	);
};

export default Allocations;

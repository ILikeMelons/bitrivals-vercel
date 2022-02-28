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
			<Title title={"Tokenomics"} description={"The first-of-its-kind $RIVAL token is what powers the Bit Rivals platform, giving our ecosystem true utility and providing systems for automatic rewards."} inViewport={inViewport} forwardedRef={forwardedRef} />
		</>
    )
}
	
const ViewportBlock = handleViewport(titleBlock);

const Tokenomics = (props) => {
	const { inViewport, forwardedRef } = props;

	return (
		<section className='relative -mt-12' id="tokenomics">
			 
			<Container className="relative flex-wrap inner" >
				<h3 className={"hidden md:block pointer-events-none font-vtf text-120px positionText z-0 " + style.backgroundText}>
					Tokenomics
				</h3>
				
				<ViewportBlock />

				<div className="relative grid grid-cols-1 mt-12 md:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-0 md:mt-0">
					<div className="absolute w-3/4 left-0 right-0 hidden md:block m-auto h-0.5 top-6 bg-yellow"></div>
					<div className="md:text-center">
						<div className="relative z-10 md:px-8 md:m-auto bg-black-50 w-max">
							<Image src={'/images/icons/coins.svg'} width={`50vw`} height={`50vw`} className=" bg-black-50" />
						</div>
						<h3 className="mt-2 md:mt-8 text-38px text-pink font-morgan">1,000,000,000</h3>
						<h4 className="mt-2 text-white text-14px">Total Supply</h4>
						<p className="mt-4 leading-5 text-black-150 text-12px">With a reasonable total supply of one billion $RIVAL, we're making sure that your token will carry lasting value.</p>
					</div>
					<div className="md:text-center">
					<div className="relative z-10 md:m-auto md:px-8 bg-black-50 w-max">
							<Image src={'/images/icons/tax.svg'} width={`50vw`} height={`50vw`} className=" bg-black-50" />
						</div>
						<h3 className="mt-2 md:mt-8 text-38px text-pink font-morgan">Powered by</h3>
						<h4 className="mt-2 text-white text-14px">the Binance Smart Chain</h4>
						<p className="mt-4 leading-5 text-black-150 text-12px">We're putting the blockchain to work for you, using the latest developments in smart contracts to bring you the most value for your investment.</p>
					</div>
					<div className="md:text-center">
					<div className="relative z-10 md:m-auto md:px-8 bg-black-50 w-max">
							<Image src={'/images/icons/staking.svg'} width={`50vw`} height={`50vw`} className=" bg-black-50" />
						</div>
						<h3 className="mt-2 md:mt-8 text-38px text-pink font-morgan">Passive Income</h3>
						<h4 className="mt-2 text-white text-14px">Staking and LP Rewards</h4>
						<p className="mt-4 leading-5 text-black-150 text-12px">A substantial portion of $RIVAL token has been delegated for staking and liquidity farming rewards bringing stability to the token economy.</p>
					</div>
				</div>
				<div className="mt-12 mb-4 md:mb-10 md:mt-36 breaker"></div>
				
			</Container>
			
		</section>
	);
};

export default Tokenomics;

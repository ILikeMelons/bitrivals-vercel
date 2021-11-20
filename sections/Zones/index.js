import Container from "../../components/Container";
import { Parallax } from "react-parallax";
import { cross_solid_yellow, square_outline_white, triangle_outline_pink } from "../../public/shapes";
import Yellow_Arrow_Icon from '../../public/yellow_arrow_icon.svg'
import handleViewport from "react-in-viewport";
import Button from "../../components/Button";
import style from './style.module.css'
import YellowTick from '../../public/images/icons/tick.svg'
import Image from 'next/image'
import Title from "../../components/Blocks/Title";
const titleBlock = (props) => {
	const {inViewport, forwardedRef} = props;
	const opacity = inViewport ? 0.2 : 0;
	const position = inViewport ? 0 : 100;
    return ( <>
			<Title title={"ZONES"} description={"The Bit Rivals ecosystem consists of five main zones. Explore what these zones have to offer by clicking on their icons below."} inViewport={inViewport} forwardedRef={forwardedRef} centered={true} />
		</>
        
    )
}

const ViewportBlock = handleViewport(titleBlock, { threshold: .5 });

const Zones = () => {
	return (
		<section id="zones" className="relative">
			
			<Container className="relative flex-wrap inner">
               
				<Parallax
					renderLayer={(percentage) => (
						<div
							style={{
								width: "46px",
								height: "52px",
								background: `url(${triangle_outline_pink.src})`,
								position: "absolute",
								top: `${180 - percentage * 230}px`,
								left: "1100px",
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
								width: "54px",
								zIndex: 10,
								height: "53px",
								background: `url(${square_outline_white.src})`,
								position: "absolute",
								top: `${percentage * 230}px`,
								left: "-100px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 150}deg)`,
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
								background: `url(${cross_solid_yellow.src})`,
								position: "absolute",
								top: `${480 + percentage * 130}px`,
								left: "1100px",
								backgroundSize: "cover",
								transform: `rotate(${percentage * 50}deg)`,
							}}
						/>
					)}
				></Parallax>
				
				<h3 className={"hidden md:block pointer-events-none font-vtf text-120px positionText z-0 " + style.backgroundText}>
					zones
				</h3>
				
				<ViewportBlock />
				
				<img src={Yellow_Arrow_Icon.src} width={`20vw`} height={`20vw`} className="w-8 m-auto mt-10 transform rotate-90 md:mb-16 md:-mt-16" />

                <div className="w-full mt-12 mb-12 md:mt-0 md:-mb-40 rotator">
					<div className={"absolute w-screen z-10 bg-contain -bottom-32 left-10 bg-yellow hidden md:block " + style.heroMask} ></div>
					
					<input type="radio" name="trigger" id="hub" hidden />
					<input type="radio" name="trigger" id="arena" defaultChecked="checked" hidden />
					<input type="radio" name="trigger" id="rewards" hidden />
					<input type="radio" name="trigger" id="loot" hidden />
					<input type="radio" name="trigger" id="swap" hidden />
					
					<div className="relative z-0 w-full bg-transparent rounded-full md:border-4 rotator_outline border-yellow">
						<div className="inset-0 top-0 flex justify-between w-full h-full md:absolute md:top-auto md:block">
							<label htmlFor="hub"><img src="images/icons/hub.svg" className="m-auto transition-all duration-150 transform scale-100 hover:scale-105" /></label>
							<label htmlFor="arena"><img src="images/icons/arena.svg" className="m-auto transition-all duration-150 transform scale-100 hover:scale-105" /></label>
							<label htmlFor="rewards"><img src="images/icons/rewards.svg" className="m-auto transition-all duration-150 transform scale-100 hover:scale-105" /></label>
							<label htmlFor="loot"><img src="images/icons/loot.svg" className="m-auto transition-all duration-150 transform scale-100 hover:scale-105" /></label>
							<label htmlFor="swap"><img src="images/icons/swap.svg" className="m-auto transition-all duration-150 transform scale-100 hover:scale-105" /></label>
						</div>
					</div>

					<div className="relative z-20 md:-top-56 ">
						<div className="relative flex flex-wrap w-full md:pr-12 rotator_content">
							<div className="w-full md:w-1/2">
								<img src="images/zones/rival_player_hub.png" />
							</div>
							<div className="w-full text-white md:pl-10 md:w-1/2">
								<h2 className="mt-5 mb-4 uppercase font-morgan text-38px md:mt-0 md:text-80px">Rival<br/> Player Hub</h2>
								<p className="mb-6 text-14px">The Rival Hub is a directory of all Bit Rivals players, where players can:</p>
								<ul className="mt-6 space-y-2 text-14px">
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Compare their stats against others
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										View game specific or global leaderboards
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Trade items directly between players
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Create an eSports team
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Add other players to their roster
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Start a squad chat using our built in VOIP and chat program
									</li>
									
								</ul>
								<div className='flex flex-row pt-6 space-x-5 text-14px'>
									<Button text="Read the litepaper" iconAfter={true} blank={true} href="files/Bit Rivals Litepaper.pdf" />
									<Button text="Rival token" iconAfter={true} href="/token" />
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap w-full md:pr-12 rotator_content">
							<div className="w-full md:w-1/2">
								<img src="images/zones/rival_arena.png" />
							</div>
							<div className="w-full text-white md:pl-10 md:w-1/2">
								<h2 className="mt-5 mb-4 uppercase font-morgan text-38px md:mt-0 md:text-80px">Rival<br/> Arena</h2>
								<p className="mb-6 text-14px">Rival Arena is the heart of Bit Rivals. This zone allows users to create their own tournaments for the games of their choice and host them either publicly or privately.</p> 
								<p className="text-14px">As long as players have registered a Rival ID, they can enter tournaments at the click of a button and winners of the tournament take the prize pool.</p>
								<div className='flex flex-row pt-6 space-x-5 text-14px'>
									<Button text="Read the litepaper" iconAfter={true} blank={true} href="files/Bit Rivals Litepaper.pdf" />
									<Button text="Rival token" iconAfter={true} href="/token" />
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap w-full md:pr-12 rotator_content">
							<div className="w-full md:w-1/2">
								<img src="images/zones/rival_rewards.png" />
							</div>
							<div className="w-full text-white md:pl-10 md:w-1/2">
								<h2 className="mt-5 mb-4 uppercase font-morgan text-38px md:mt-0 md:text-80px">Rival<br/> Rewards</h2>
								<p className="mb-6 text-14px">Rival Rewards is a point-based rewards system that allows players to earn points by participating in tournaments or by simply playing their favourite games.</p> 
								<p className="text-14px">Players can expect to use their points to redeem rewards such as:</p>
								<ul className="mt-6 space-y-2 text-14px">
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										$RIVAL tokens
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Profile cosmetics and NFTs
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Official Bit Rivals merchandise 
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										XP Boosters
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Giveaway entries
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Raffle tickets for gift cards and gamer gear
									</li>
								</ul>
								<div className='flex flex-row pt-6 space-x-5 text-14px'>
									<Button text="Read the litepaper" iconAfter={true} blank={true} href="files/Bit Rivals Litepaper.pdf" />
									<Button text="Rival token" iconAfter={true} href="/token" />
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap w-full md:pr-12 rotator_content">
							<div className="w-full md:w-1/2">
								<img src="images/zones/rival_loot.png" />
							</div>
							<div className="w-full text-white md:pl-10 md:w-1/2">
								<h2 className="mt-5 mb-4 uppercase font-morgan text-38px md:mt-0 md:text-80px">Rival<br/> Loot</h2>
								<p className="mb-6 text-14px">Rival Loot is the official Bit Rivals marketplace where players can purchase new items, take part in auctions (listing and buying), mint their own NFTs and buy official merchandise. </p> 
								<p className="text-14px">Players can expect to find items such as:</p>
								<ul className="mt-6 space-y-2 text-14px">
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Profile backgrounds
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Profile avatars
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Profile picture trims
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Profile titles
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										XP Boosters
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Bit Rivals accessories
									</li>
									<li className="flex">
										<div className="relative mr-1 top-0.5">
											<Image src={YellowTick.src} width={`20vw`} height={`20vw`} />
										</div>
										Much more
									</li>	
								</ul>
								<div className='flex flex-row pt-6 space-x-5 text-14px'>
									<Button text="Read the litepaper" iconAfter={true} blank={true} href="files/Bit Rivals Litepaper.pdf" />
									<Button text="Rival token" iconAfter={true} href="/token" />
								</div>
							</div>
						</div>
						<div className="relative flex flex-wrap w-full md:pr-12 rotator_content">
							<div className="w-full md:w-1/2">
								<img src="images/zones/rival_swap.png" />
							</div>
							<div className="w-full text-white md:pl-10 md:w-1/2 text-14px">
								
								<h2 className="mt-5 mb-4 uppercase font-morgan text-38px md:mt-0 md:text-80px">Rival<br/> Swap</h2>
								<p className="mb-6">Rival Swap is our very own DEX tool that allows you to swap, stake, and farm $RIVAL.</p>
								<p className="text-yellow">Swap</p>
								<p className="mb-6">Find the best rates for exchanging $RIVAL token to use across the ecosystem.</p>
								<p className="text-yellow">Farming</p>
								<p className="mb-6">Find the best reward rate when adding $RIVAL and $BNB as a liquidity pair and gain interest on trading fees.</p>
								<p className="text-yellow">Pools</p>
								<p className="mb-6">Stake $RIVAL to yield the highest single asset APY on your investment.</p>
								<p className="text-yellow">Bridge</p>
								<p className="mb-6">Our cross-chain functionality. Exchange BSC $RIVAL for pegged $RIVAL tokens on other chains, such as Ethereum, Matic, or Cardano. </p>
									
								<div className='flex flex-row pt-6 space-x-5 text-14px'>
									<Button text="Read the litepaper" iconAfter={true} blank={true} href="files/Bit Rivals Litepaper.pdf" />
									<Button text="Rival token" iconAfter={true} href="/token" />
								</div>
							</div>
						</div>
					</div>
					<div className="clear-both"></div>
				</div>
				
			</Container>
			
		</section>
	);
};


export default Zones;

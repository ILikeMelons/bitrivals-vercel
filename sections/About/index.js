import Container from '../../components/Container'
import Register from '../../components/Register'
import Banner from '../../sections/Banner'
import { Parallax } from 'react-parallax';
import SocialLinks from '../../components/SocialLinks';
import Button from '../../components/Button'
import { triangle_solid_white, cross_solid_yellow, triangle_outline_pink, circle_solid_white, square_outline_yellow } from '../../public/shapes'
import style from './style.module.css'

const About = ({variant, user}) => {
    return (
      <section className="pt-24">
        <Container className="flex-wrap py-16 pt-2 pb-6 md:pt-16 js-nav inner">
          <div className="relative z-10 items-center w-full text-white lg:w-1/2 default:pr-6">
            <div>
          
           {/*  <Parallax
              renderLayer={percentage => (
                <div style={{
                  width: '35px',
                  height: '35px',
                  background: `url(${triangle_solid_white.src})`,
                  position: 'absolute',
                  top: `${percentage * 230}px`,
                  left: '-140px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 150}deg)`
                }} />
              )}
            >
            </Parallax>

            <Parallax
              renderLayer={percentage => (
                <div style={{
                  width: '35px',
                  height: '35px',
                  background: `url(${cross_solid_yellow.src})`,
                  position: 'absolute',
                  top: `${50 - (percentage * 110)}px`,
                  left: '340px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 300}deg)`
                }} />
              )}
            >
            </Parallax>

            <Parallax strength={30}
              renderLayer={percentage => (
                <div style={{
                  width: '46px',
                  height: '50px',
                  background: `url(${triangle_outline_pink.src})`,
                  position: 'absolute',
                  top: `${percentage * 70}px`,
                  left: '1000px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 220}deg)`
                }} />
              )}
            >
            </Parallax>

            <Parallax strength={30}
              renderLayer={percentage => (
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: `url(${circle_solid_white.src})`,
                  position: 'absolute',
                  top: `${380 + (percentage * 70)}px`,
                  left: '1000px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 420}deg)`
                }} />
              )}
            >
            </Parallax>

            <Parallax strength={30}
              renderLayer={percentage => (
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `url(${square_outline_yellow.src})`,
                  position: 'absolute',
                  top: `${400 + (percentage * 50)}px`,
                  left: '460px',
                  backgroundSize: 'cover',
                  transform: `rotate(${percentage * 120}deg)`
                }} />
              )}
            >
            </Parallax> */}
              {variant == 'token' ?
                <h1 className="pb-2 mb-4 font-semibold uppercase md:mb-1 text-56px md:text-80px font-morgan">
                 $rival<br/> 
                 token
               </h1>:
                <>
               
                <div className={'relative bg-yellow text-black-50 w-min p-2 font-morgan text-30px  '} >
                  PLAY.WIN.EARN
                  <div className='absolute border-t-2 border-r-2' style={{width:"75px", height:"20px", borderColor:"#F9BA3F", top:"-7px", right:"-8px"}} />
                </div>
                
                 <h1 className="pb-2 mb-4 font-semibold uppercase mt-4 md:mb-1 text-42px md:text-68px font-morgan">
                 Be rewarded for<br/> 
                 <h1 className='text-yellow'>PLAYING YOUR</h1>
                 <h1 className='text-yellow'>FAVOURITE GAMES</h1>
               </h1>
                </>
               
              }

              {variant == 'token' ?
                <div className='text-14px lg:pr-12'>
                  <p className="mb-6">
                    $RIVAL is a non-deflationary, automatic reward BSC utility token that powers the Bit Rivals ecosystem. 
                  </p>
                  <div className='flex flex-row pt-6 space-x-5'>
                    <Button text="Read the litepaper" iconAfter={true} blank={true} href="/files/Bit Rivals Litepaper.pdf" />
                    <Button text="Read the audit" iconAfter={true} href="https://www.certik.org/projects/bit-rivals" />
                  </div>
                  
                  
                </div> : 
                <div className='text-14px lg:pr-12'>
                <p className="mb-6">
                Most casual players will never earn money playing video games. Bit Rivals is a cross-game platform that rewards 
                gamers of all skill levels for playing their favourite games. <span className='text-yellow'>Play games, earn crypto, win rewards.</span>
                </p>
                
                <div className='w-auto text-yellow bg-yellow bg-opacity-20 inline-block px-4 py-2 border-2 border-yellow'>
                 
                 <a className='flex flex-row' href='/files/Bit Rivals Litepaper.pdf' target={"_blank"}> Read the litepaper <ArrowImage /> </a>
                   
                </div>
                {/*<div className='relative h-10 mb-5'>
                 <Button text="Read the litepaper" iconAfter={true} blank={true} href="/files/Bit Rivals Litepaper.pdf" />
                    <div className='absolute bg-pink text-right pr-5 right-8 sm:right-96 md:right-20  py-5 bg-opacity-20' style={{width:'1000px'}}>
                        <p className='text-22px sm:text-30px font-morgan text-pink'>PREsALE STARTS JANUARY 21ST</p>
                        <a href='https://gleam.io/PFQx5/bit-rivals-presale-whitelist-spots' target={'_blank'}><p className='pt-1 text-sm'>Click <a className='underline cursor-pointer'>here</a> to join the whitelist</p> </a>
                    </div>
            </div>
                <p className='pb-5 pt-14 md:pt-11'>Stay in the loop</p>
                <SocialLinks />*/}
              </div>

              }


              
            </div>
          </div>
          {variant == 'token' ? 
          <div class="relative z-10 w-full py-16 md:px-12 registerMask lg:w-1/2 bg-black-50 md:text-center md:mb-32 md:h-96 flex items-center">
            <div>
              <h2 className="mb-2 text-yellow font-morgan text-30px">PRESALE COMING SOON</h2>
              <p className="text-white text-14px">We are working hard on getting things ready for the presale. In the meantime, why not follow us.</p>
              <div className="flex pt-8 md:justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
          : 
         <div className="relative z-10 w-full  lg:w-1/2  md:text-center md:mb-32 md:h-96 flex items-center pl-20">
           <img src='/placeholders/Group1742.png' className='md:absolute object-cover md:scale-125' style={{top:'40px' }} />
         </div> 
         
        }
          
        </Container>
        {variant == 'token' ? '' : <Banner /> }
      </section>
    );
}

const ArrowImage = () => {
  return (
    <div className='flex align-center pt-2 pl-2'>
      <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.83594 6.13544C8.6276 6.34371 8.36719 6.29164 8.05469 5.97924V4.24542C6.86719 4.24542 5.73958 4.39641 4.67188 4.6984C3.60417 5.00038 2.73438 5.42473 2.0625 5.97143C1.39062 6.51813 1.05469 7.10909 1.05469 7.7443C1.05469 7.87967 1.00521 7.99682 0.90625 8.09575C0.807292 8.19468 0.690104 8.24414 0.554688 8.24414C0.419271 8.24414 0.302083 8.19468 0.203125 8.09575C0.104167 7.99682 0.0546875 7.87967 0.0546875 7.7443C0.0546875 6.89041 0.273438 6.11201 0.710938 5.40911C1.14844 4.70621 1.73958 4.12827 2.48438 3.67529C3.22917 3.2223 4.08073 2.87085 5.03906 2.62093C5.9974 2.37101 7.0026 2.24605 8.05469 2.24605V0.512231C8.36719 0.210244 8.6276 0.163384 8.83594 0.371651L11.8672 2.80837C11.9922 2.93333 12.0547 3.08172 12.0547 3.25354C12.0547 3.42536 11.9922 3.57376 11.8672 3.69872L8.83594 6.13544Z" fill="#F9BA3F"/>
</svg>
    </div>
  )
}

export default About;
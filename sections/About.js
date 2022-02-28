import Container from '../components/Container'
import Register from '../components/Register'
import Banner from '../sections/Banner'
import { Parallax } from 'react-parallax';
import SocialLinks from '../components/SocialLinks';
import Button from '../components/Button'
import { triangle_solid_white, cross_solid_yellow, triangle_outline_pink, circle_solid_white, square_outline_yellow } from '../public/shapes'

const About = ({variant, user}) => {
    return (
      <section className="pt-24">
        <Container className="flex-wrap py-16 pt-2 pb-6 md:pt-16 js-nav inner">
          <div className="relative z-10 items-center w-full text-white lg:w-1/2 default:pr-6">
            <div>
          
            <Parallax
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
            </Parallax>
              {variant == 'token' ?
                <h1 className="pb-2 mb-4 font-semibold uppercase md:mb-1 text-56px md:text-80px font-morgan">
                 $rival<br/> 
                 token
               </h1>:
                <h1 className="pb-2 mb-4 font-semibold uppercase md:mb-1 text-56px md:text-68px font-morgan">
                 Be rewarded for<br/> 
                 <h1 className='text-yellow'>PLAYING YOUR</h1>
                 <h1 className='text-yellow'>FAVOURITE GAMES</h1>
               </h1>
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
                <p>Compete, be rewarded, be social, buy loot, customise your profile, squad up and more.</p>
                <div className='flex flex-row pt-6 space-x-5 pb-5'>
                  <Button text="Read the litepaper" iconAfter={true} blank={true} href="/files/Bit Rivals Litepaper.pdf" />
                  <Button text="Whitelist" iconAfter={true} href="/token" />
                </div>
                {/*<div className='relative h-10 mb-5'>
                    <div className='absolute bg-pink text-right pr-5 right-8 sm:right-96 md:right-20  py-5 bg-opacity-20' style={{width:'1000px'}}>
                        <p className='text-22px sm:text-30px font-morgan text-pink'>PREsALE STARTS JANUARY 21ST</p>
                        <a href='https://gleam.io/PFQx5/bit-rivals-presale-whitelist-spots' target={'_blank'}><p className='pt-1 text-sm'>Click <a className='underline cursor-pointer'>here</a> to join the whitelist</p> </a>
                    </div>
            </div>*/}
                <p className='pb-5 pt-14 md:pt-11'>Stay in the loop</p>
                <SocialLinks />
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
          : <Register user={user} />
        }
          
        </Container>
        {variant == 'token' ? '' : <Banner /> }
      </section>
    );
}

export default About;
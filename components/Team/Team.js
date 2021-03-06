import {corvo, peach, fox, draven, shepard, nada} from '../../public'
import Image from 'next/image'
import style from './style.module.css'

const Team = (props) => {
	const { inViewport, forwardedRef } = props;
	const opacity = inViewport ? 1 : 1;
	const position = inViewport ? 0 : 0;

	return (
      <div className="w-full" inViewport={inViewport} forwardedRef={forwardedRef} style={{ opacity: opacity, transform: `translateX(${position}px)` }}>
        <div className="relative flex items-end justify-end w-full mt-24 text-right md:pr-96 md:right-6 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-2 text-right md:pr-96 md:right-72">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>FOX</p>
            <p className='text-pink text-18px font-morgan'>CO-FOUNDER & DIGITAL <br/>OVERLORD</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-0 ' + style.image }>
            <Image src={fox}  />
          </div>
        </div>
        <div className="relative flex items-end justify-end w-full transform translate-y-1 md:pr-80 md:-right-12 md:-top-14 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-4 text-right md:pr-80 md:right-72">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>SHEPARD</p>
            <p className='text-pink text-18px font-morgan'>CO-FOUNDER & <br/> OPERATIONS NINJA</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-4 ' + style.image }>
            <Image src={shepard}  />
          </div>
        </div>
        <div className="relative flex items-end justify-end w-full md:pr-40 md:-right-3 md:-top-24 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-4 text-right md:pr-40 md:right-72">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>DRAVEN</p>
            <p className='text-pink text-18px font-morgan'>FULL STACK <br/>PANCAKE</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-4 ' + style.draven }>
            <Image src={draven}  />
          </div>
        </div>
        <div className="relative flex items-end justify-end w-full transform translate-y-2 md:pr-4 md:right-0 md:-top-40 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-6 text-right md:pr-4 md:right-72">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>PEACH</p>
            <p className='text-pink text-18px font-morgan'>BRAND <br/>WARRIOR</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-4 ' + style.peach }>
            <Image src={peach}  />
          </div>
        </div>
        <div className="relative flex items-end justify-end w-full transform translate-x-2 translate-y-2 md:pr-0 md:-right-24 md:-top-52 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-5 text-right md:right-72">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>CORVO</p>
            <p className='text-pink text-18px font-morgan'>CHIEF <br/>CHATTER</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-4 ' + style.corvo }>
            <Image src={corvo}  />
          </div>
        </div>
        <div className="relative flex items-end justify-end w-full transform translate-x-6 translate-y-8 md:pr-0 md:-right-60 md:-top-80 -right-20">
          <div className="md:absolute bottom-0.5 mr-3 md:mr-6 text-right md:right-80">
            <p className='pb-2 text-white uppercase text-26px font-morgan'>NADA</p>
            <p className='text-pink text-18px font-morgan'>SOCIAL <br/>SUPERHERO</p>
          </div>
          <div className={ 'w-52 md:w-auto md:mt-0 mt-4 ' + style.nada }>
            <Image src={nada}  />
          </div>
        </div>
      </div>
    )
}

export default Team;
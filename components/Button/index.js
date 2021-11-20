import Yellow_Arrow_Icon from '../../public/yellow_arrow_icon.svg'
import Image from 'next/image'

const Button = (props) => {
    const {href, iconAfter, text, blank} = props;

    return (
        <a href={href} target={blank ? "_blank" : ''} rel="noreferrer" className='relative flex flex-row pr-8 arrow text-yellow text-14px'>{text} { iconAfter ? <div className='absolute right-0 transition-all duration-75 transform -translate-y-1/2 top-1/2'><Image src={Yellow_Arrow_Icon.src} width={`20vw`} height={`20vw`}/></div> : '' }</a>
    )
}

export default Button;
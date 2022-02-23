import Button from '../Button'

const Title = (props) => {
	const { inViewport, forwardedRef } = props;
	const opacity = inViewport ? 1 : 0;
	const position = inViewport ? 0 : 100;

	return (
		<div className="relative z-20 w-full" ref={forwardedRef}>
			<div className="flex flex-col text-white md:pt-20">
				<div
					className={'w-full md:w-5/12 transition-all duration-700 ' + (props.centered ? 'md:m-auto md:pl-24' : '')}
					style={{ opacity: opacity, transform: `translateX(${position}px)` }}
				>
					<h2 className='flex items-end uppercase font-morgan text-38px md:text-80px'><span className="block" dangerouslySetInnerHTML={{__html: props.title.replace('\n', '<br/>')}}></span><img src="images/icons/cross.svg" className="h-8 ml-4 md:h-auto" /></h2>
				</div>
				<div
					className={'relative w-full mt-2 md:mt-10 md:mb-24 transition-all duration-700  text-14px md:w-1/2 ' + (props.centered ? '  md:mx-auto md:text-center' : ' md:ml-64')}
					style={{ opacity: opacity, transform: `translateX(-${position}px)` }}
				>
					<h2>
					    {props.description}
					</h2>
					{props.litepaper ? 
					<div className='flex flex-wrap pt-2'>
					<Button text="Read the litepaper" iconAfter={true} blank={true} href="/files/Bit Rivals Litepaper.pdf" />
					</div> : '' }
				</div>
				
			</div>
		</div>
	);
};

export default Title;
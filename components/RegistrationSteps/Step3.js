import styles from './style.module.css'


const Step3 = ({SubmitData, code}) => {
    const CopyToClipBoard = (e) => {
        navigator.clipboard.writeText(e.target.value)
    }

    return (
        <div className="w-full bg-AthensGray">
            <h1 className="font-semibold text-white text-30px font-morgan">GREAT STUFF!</h1>
            <p className="max-w-sm pb-10 font-medium text-white text-14px">
                Here is your very own share URL. Share it with up to 10 people and get 100 $RIVAL for each person that registers a Rival ID. They also get 100 $RIVAL for signing up too!
            </p>
            <div className='flex flex-col'>
                <label className='pr-2 text-white'>Your share URL</label>
                <div className="relative mb-4 inputWrapper">
                    <input type="text" value={"www.bitrivals.gg/?invite=" + code} id='inviteInput' className={'border-2 border-white bg-black-50 py-3 px-5 w-full outline-none text-white ' + styles.inactiveCaret} onClick={(e)=> {CopyToClipBoard(e)}}/>
                </div>
            </div>
            <p className="max-w-sm pt-10 font-medium text-white text-14px">
                Share your unique invitation code with up to 10 friends to get 100
                $RIVAL for everyone that sign up!
            </p>
        </div>
    )
}

export default Step3;
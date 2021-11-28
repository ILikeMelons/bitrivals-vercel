import styles from './style.module.css'
import Script from 'next/script'
import { useEffect } from 'react'
import ReferralCode from '../Blocks/ReferralCode';

const Step3 = ({SubmitData, code}) => {
    
    
    return (
        <>
       
        <div className="bg-AthensGray w-full">
            <h1 className="text-30px font-semibold text-white font-morgan">GREAT STUFF!</h1>
        <p className="text-14px max-w-sm font-medium pb-10 text-white">
        Here is your very own share URL. Share it with up to 10 people and get 100 $RIVAL for each person that registers a Rival ID. They also get 100 $RIVAL for signing up too!
        </p>
        <ReferralCode userShareCode={code}/>
       
        <p className="text-14px max-w-sm font-medium pt-10 text-white">
          Share your unique invitation code with up to 10 friends to get 100
          $RIVAL for everyone that sign up!
        </p>
        </div>
        </>
    )
}

export default Step3;
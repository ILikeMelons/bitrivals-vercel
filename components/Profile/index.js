import { useState, useEffect } from 'react';
import ReferralCode from '../Blocks/ReferralCode';
import { LoggedInRegisterID } from '../RegistrationSteps';
import { getCode, loadProfile, updateWallet } from '../../requests/profile';
import Script from 'next/script'
import Loader from '../Loader';
import * as Yup from 'yup';
const Profile = ({user}) => {
    const [userShareCode, setUserShareCode ] = useState('');
    const [rivalID, setRivalID] = useState('');
    const [referalUsed, setReferralUsed] = useState(0)
    const [wallet, setWallet] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const regex = /^0x[A-z0-9]{40}$/
    const validate = (wallet) => {
      const res = regex.test(wallet);
      console.log(res)
    }
    useEffect(()=>{
      console.log(user);
        if(user){
            getCode(user.id)
            .then((res)=>{if(res.invite_id !== undefined){setUserShareCode(res.invite_id)}})
            .then(()=>{loadProfile(user.id, userShareCode).then((res)=>{setReferralUsed(res.count < 10 ? res.count : 10); setRivalID(res.rivalID); setWallet(res.wallet) })
            .catch(e=>{console.log(e)})}).catch((e)=>{console.log(e)})
          }
          setIsLoading(false)
    }, [referalUsed])
  
    return (
      <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
        
        <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
          Welcome Back {rivalID}!
        </h1>
        <p className="text-white text-14px pb-5">
          The Rival ID is your gateway to the Bit Rivals ecosystem.
        </p>
        { isLoading ? 
        <div></div>
        : 
         (rivalID == undefined || rivalID.length == 0)  ? 
        <div className={rivalID == undefined ? "hidden" : "block"}>
        <p className="text-white text-14px pb-5">
          It seems you didn&apos;t select a Rival ID. <br /><br />
          Don&apos;t worry! Here you can pick your own Rival ID
        </p>
        
        <LoggedInRegisterID userID={user.id} userEmail={user.email} setUserShareCode={setUserShareCode} setRivalID={setRivalID} />
      </div>
        : ""
      }
        <ReferralCode userShareCode={userShareCode}/>
        <div className='flex flex-row flex-1 pt-5'>
            <div className='flex flex-col border-r-2 border-gray-800 pr-4 sm:pr-10'>
                <p className='text-white pb-3'>Sign ups used</p>
                <div className='flex text-gray-500 align-text-bottom '><p className='text-yellow text-42px pr-2'>{referalUsed}</p>  <p className='mt-4'>/10</p></div>
            </div>
            <div className='flex flex-col pl-5 sm:pl-10'>
                <p className='text-white pb-3'>$Rival earned</p>
                <div className='flex text-gray-500 align-text-bottom '><p className='text-yellow text-42px pr-2 ' >{referalUsed*100}</p>  <p className='mt-4 font-extrabold'>/1000$RIVAL</p></div>
            </div>
        </div>

        <div className='pt-10 text-gray-300 text-14px'>
            <p className='underline'>Your Wallet address</p>
           <div className='flex flex-col sm:flex-row'>
             <div className='w-full'>
                <input type='text' className='italic text-opacity-75 w-full bg-black-50 w-full'  value={wallet} onChange={(e)=> {setWallet(e.target.value)}}/>
           <span className='mt-1 mb-1 text-pink text-14px'>{errorMsg}</span>
             </div>
           
           {!isSubmitting  ? (
								<button
									type="submit"
									className="w-auto  transition-colors duration-200 pl-5 text-pink  hover:text-white border-pink border-2 mt-2 sm:mt-0 sm:border-0"
                  onClick={()=>{ setIsSubmitting(true); if(regex.test(wallet)){updateWallet(user.id, wallet).then(() => {setIsSubmitting(false);setErrorMsg('');})}else{setErrorMsg('Must be a valid wallet address');setIsSubmitting(false);}  }}
								>
									<i className="far fa-save"></i>
								</button>
							) : (
								<button
									type="submit"
									className="w-auto pl-5 font-bold bg-blue-500  text-pink  border-pink border-2 mt-2 sm:mt-0 sm:border-0"
								>
								<div className="relative">
									<Loader />
								</div>
								
								</button>
							)}
           </div>
        </div>
      </div>
    );
  }

  

 export default Profile;
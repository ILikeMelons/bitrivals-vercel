import { useState, useEffect } from 'react';
import ReferralCode from '../Blocks/ReferralCode';
import { LoggedInRegisterID } from '../RegistrationSteps';
import { getCode, loadProfile } from '../../requests/profile';


const Profile = ({user}) => {
    const [userShareCode, setUserShareCode ] = useState('');
    const [rivalID, setRivalID] = useState('');
    const [referalUsed, setReferralUsed] = useState(0)
    const [wallet, setWallet] = useState('')

    useEffect(()=>{
        if(user){
            getCode(user.id)
            .then((res)=>{if(res.invite_id !== undefined){setUserShareCode(res.invite_id)}})
            .then(()=>{loadProfile(user.id, userShareCode).then((res)=>{console.log(res); setReferralUsed(res.count < 10 ? res.count : 10); setRivalID(res.rivalID); setWallet(res.wallet) })
            .catch(e=>{console.log(e)})}).catch((e)=>{console.log(e)})
          }

    
    }, [rivalID])
  
    return (
      <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
        <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
          Welcome Back {rivalID}!
        </h1>
        <p className="text-white text-14px pb-5">
          The Rival ID is your gateway to the Bit Rivals ecosystem.
        </p>
        { (rivalID == undefined || rivalID.length == 0)   ? 
        <div className={rivalID == undefined ? "hidden" : "block"}>
        <p className="text-white text-14px pb-5">
          It seems you didn&apos;t select a Rival ID. <br /><br />
          Don&apos;t worry! Here you can pick your own Rival ID
        </p>
        
        <LoggedInRegisterID userID={user.id} userEmail={user.email} setUserShareCode={setUserShareCode} setRivalID={setRivalID} />
      </div>
        : ""}
        
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

        <div className='pt-10 text-gray-300 text-14px hidden'>
            <p className='underline'>Your Wallet address</p>
            <p className='text-pink italic text-opacity-75'>{wallet}</p>
        </div>
      </div>
    );
  }

  

 export default Profile;
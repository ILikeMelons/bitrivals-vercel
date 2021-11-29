import { useState, useEffect } from 'react';
import ReferralCode from '../Blocks/ReferralCode';
import { LoggedInRegisterID } from '../RegistrationSteps';
import { getCode, loadProfile } from '../../requests/profile';
import styles from './style.module.css'

const Profile = ({user, shareCode, rivalIdentifier, referralUsed}) => {
    const [userShareCode, setUserShareCode ] = useState(shareCode);
    const [rivalID, setRivalID] = useState(rivalIdentifier);
    const [referalUsed, setReferralUsed] = useState(referralUsed)
  
  
    return (
      <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
        <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
          Welcome Back {rivalID}!
        </h1>
        <p className="text-white text-14px pb-5">
          The Rival ID is your gateway to the Bit Rivals ecosystem.
        </p>
        { (rivalID.length == 0 || rivalID == undefined)   ? 
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
            <div className='flex flex-col border-r-2 border-gray-800 pr-10'>
                <p className='text-white pb-3'>Sign ups used</p>
                <div className='flex text-gray-500 align-text-bottom '><p className='text-yellow text-42px pr-2'>{referalUsed}</p>  <p className='mt-4'>/10</p></div>
            </div>
            <div className='flex flex-col pl-10'>
                <p className='text-white pb-3'>$Rival earned</p>
                <div className='flex text-gray-500 align-text-bottom '><p className='text-yellow text-42px pr-2 ' >{referalUsed*100}</p>  <p className='mt-4 font-extrabold'>/1000$RIVAL</p></div>
            </div>
        </div>
      </div>
    );
  }

  export async function getStaticProps() {
      let shareCode = '';
      let rivalID = '';    
      let referralUsed = 0;
      if(user){
        getCode(user.id)
        .then((res)=>{if(res.invite_id !== undefined){shareCode = res.invite_id}})
        .then(()=>{loadProfile(user.id, userShareCode).then((res)=>{rivalID = res.rivalID; res.count < 10 ? referralUsed = res.count : referralUsed = 10})
        .catch(e=>{console.log(e)})}).catch((e)=>{console.log(e)})
      }

      return {
          props:{
              shareCode : shareCode,
              rivalIdentifier : rivalID,
              referralUsed : referralUsed
          }
      }
  }

 export default Profile;
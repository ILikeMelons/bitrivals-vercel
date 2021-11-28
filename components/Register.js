import supabase from '../utils/supabaseClient'
import {Formik, Form, Field, useFormik } from "formik";
import router, {useRouter} from 'next/router'
import {Step1, Step2, Step3, LoggedInRegisterID} from './RegistrationSteps'
import {submitWalletAddress, registerUserComplete } from './../requests/registration'

import Script from 'next/script'
import { getCode, loadProfile } from '../requests/profile';
import  getInvitationCode  from '../hooks/getInvitationCode';
import ShareButtons from '../components/Blocks/ShareButtons'
import {useEffect, useState} from 'react'
import * as Yup from 'yup';
import { P } from '@storybook/components';
import { copy } from '../utils/clipboard';


const Register = ({user}) => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const [currentRegistration, setCurrentRegistation] = useState('');
  const inviteCode = getInvitationCode();
 
  const SubmitFirstStep = async(values) => {
    const {email, password, rivalID} = values;
    await registerUserComplete('',rivalID,email,password, inviteCode)
    .then((res)=>{
      setsuccessMsg('User added successfully!')
      setErrorMsg(''); 
      setCurrentRegistation(res.invitation)
      setCurrentUser(res.user);
      next();
    }).catch(e=>{setErrorMsg(e)})
  }

  const SubmitSecondStep = async(value) => {
    if(!currentUser){
      alert('Please refresh the page');
    }

    submitWalletAddress(currentUser.id, value.walletAddress).then((res)=> {
      setsuccessMsg('Wallet address added successfully!')
      setTimeout(()=>{
        next()
      }, 500);
      }).catch(e=>{
        setErrorMsg(e);
      })
    
  }

  const SubmitThirdStep = () => {

  }

  const next = () => {
    setRegistrationStep(registrationStep+=1)
  }
  

  return (
    <>
   
   {
     user == null  ? 
     <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
     {registrationStep == 1 && <Step1 submitData={SubmitFirstStep} errorMsg={errorMsg} inviteCode={inviteCode} />}
     {registrationStep == 2 && <Step2 submitData={SubmitSecondStep} errorMsg={errorMsg} rivalID={currentUser.user_metadata.rivalID} successMsg={successMsg}/>}
     {registrationStep > 2 && <Step3 submitData={SubmitThirdStep} code={currentRegistration} />}
   </div> :  <Profile user={user}  />
   }
   </>
  )
}



const Profile = ({user}) => {
  const [userShareCode, setUserShareCode ] = useState('')
  const [rivalID, setRivalID] = useState('');
  const [referalUsed, setReferralUsed] = useState(0)
  const [loading, setloading] = useState(false);
   



useEffect(async()=>{
  if(user){
    setloading(true);
    getCode(user.id).then((res)=>{if(res.invite_id !== undefined){setUserShareCode(res.invite_id);}}).then(()=>{loadProfile(user.id, userShareCode).then((res)=>{setRivalID(res.rivalID); setReferralUsed(res.count < 10 ? res.count : 10)}).catch(e=>{console.log(e)})}).catch((e)=>{console.log(e)})
    setloading(false);
  }
 
 },[userShareCode,rivalID])


  return (
    <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
      <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
        Welcome Back {rivalID}!
      </h1>
      <p className="text-white text-14px pb-5">
        The Rival ID is your gateway to the Bit Rivals ecosystem.
      </p>
      { !loading && (rivalID.length == 0 || rivalID == undefined)   ? 
      <div className={rivalID == undefined ? "hidden" : "block"}>
      <p className="text-white text-14px pb-5">
        It seems you didn&apos;t select a Rival ID. <br /><br />
        Don&apos;t worry! Here you can pick your own Rival ID
      </p>
      
      <LoggedInRegisterID userID={user.id} userEmail={user.email} setUserShareCode={setUserShareCode} setRivalID={setRivalID} />
    </div>
      : ""}
      
      <div className="flex flex-col"  onClick={() => { copy("referralURL")}}>
        <label className="pt-10 text-gray-300 text-14px">Your share URL</label>
        <input
          id="referralURL"
          type="text"
          value={"www.bitrivals.gg/?invite=" + userShareCode}
          className={"text-center  text-pink bg-transparent cursor-pointer py-2 hidden-cursor"}

        />
      </div>
      <div className="flex flex-row justify-around pt-10">
        <ShareButtons shareCode={userShareCode} />
      </div>
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





export default Register;
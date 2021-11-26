import supabase from '../utils/supabaseClient'
import {Formik, Form, Field, useFormik } from "formik";
import router, {useRouter} from 'next/router'
import {Step1, Step2, Step3, LoggedInRegisterID} from './RegistrationSteps'
import {addWalletAddress, verifyEmail, SubscribeEmail, } from './../requests/registration'
import {insertInvitation, saveInvitation, callIncrement} from './../requests/invitation'
import { getCode, loadProfile } from '../requests/profile';
import  getInvitationCode  from '../hooks/getInvitationCode';
import ShareButtons from '../components/Blocks/ShareButtons'
import {useEffect, useState} from 'react'
import * as Yup from 'yup';
import { P } from '@storybook/components';


const Register = ({user}) => {
  const [registrationStep, setRegistrationStep] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  const [validEmail, setValidEmail] = useState(true);
  const [currentRegistration, setCurrentRegistation] = useState('');
  const inviteCode = getInvitationCode();
 
  const SubmitFirstStep = async(value) => {
  const newsletterRegistration= await SubscribeEmail(value.email)
   const verify = await verifyEmail(value.email);
   const email = await verify.json();
   //console.log(email)
   if(email.count > 0 || email == null){
    setValidEmail(false);
    alert('Email in use')
     return;
   }


  
   const newUser = await registerUser(value)
  
  
    if(newUser){
     
      setCurrentUser(await newUser)
      //console.log(currentUser);
      if(inviteCode!=='' && inviteCode !== null){
        const saveInvitationresponse = saveInvitation(inviteCode ,newUser.user.id)
        .then((res)=> {
          return res
        }).catch((e)=>{
          return e;
        })
        const incrementing = callIncrement(inviteCode).then((res)=>{return res}).catch((e)=> {return e})
      }
      const invitation = insertInvitation(newUser.user.id).then((res) => {
        return res.json();
      }).catch(e => {
        return e;
      })
      
      const res = await invitation;
     
     //console.log(res);
      if(res.shareCode !== undefined){
        setCurrentRegistation(res.shareCode)
        next();
      }
    }
  }

  const SubmitSecondStep = async(value) => {
    if(!currentUser){
      alert('Please refresh the page');
    }

    const response =  addWalletAddress(value, currentUser).then((res)=> {
        return res;
      }).catch(e=>{
         return e;
      })
     
     next();
    
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
      
     {registrationStep == 1 && <Step1 submitData={SubmitFirstStep} emailInUse={validEmail} inviteCode={inviteCode} />}
     {registrationStep == 2 && <Step2 submitData={SubmitSecondStep} rivalID={currentUser.user.user_metadata.rivalID}/>}
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
  const CopyToClipBoard = (e) => {
    navigator.clipboard.writeText(e.target.value)
}



useEffect(async()=>{
  setloading(true);
  getCode(user.id).then((res)=>{setUserShareCode(res.invite_id);}).then(()=>{loadProfile(user.id, userShareCode).then((res)=>{setRivalID(res.rivalID); setReferralUsed(res.count)}).catch(e=>{console.log(e)})}).catch((e)=>{console.log(e)})
  
  
  setloading(false);
 },[userShareCode,rivalID])


  return (
    <div className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
      <h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
        Welcome Back {rivalID}!
      </h1>
      <p className="text-white text-14px pb-5">
        The Rival ID is your gateway to the Bit Rivals ecosystem.
      </p>
      { !loading && rivalID.length == 0   ? 
      <div className={loading ? "invisible" : "visible"}>
      <p className="text-white text-14px pb-5">
        It seems you didn't select a Rival ID. <br /><br />
        Don't worry! Here you can pick your own Rival ID
      </p>
      <LoggedInRegisterID userID={user.id} userEmail={user.email} setUserShareCode={setUserShareCode} setRivalID={setRivalID} />
    </div>
      : ""}
      
      <div className="flex flex-col">
        <label className="pt-10 text-gray-300 text-14px">Your share URL</label>
        <input
          type="text"
          value={"Bitrivals.gg/?invite=" + userShareCode}
          id="inviteInput"
          className={"text-center  text-pink bg-transparent cursor-pointer py-2"}
          onClick={(e) => {
            CopyToClipBoard(e);
          }}
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


const registerUser = async values => {
  // call default function in pages/api/register
  // send the email and password from form submission event to that endpoint
  const res = await fetch("/api/auth/register", {
    body: JSON.stringify({
      email: values.email,
      password: values.password,
      rivalID: values.rivalID
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })

  const user = await res.json()
  return user;
   
  
}


export default Register;
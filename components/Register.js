import supabase from '../utils/supabaseClient'
import {Formik, Form, Field } from "formik";
import router, {useRouter} from 'next/router'
import {Step1, Step2, Step3} from './RegistrationSteps'
import {addWalletAddress, verifyEmail, SubscribeEmail} from './../requests/registration'
import {insertInvitation, saveInvitation, callIncrement} from './../requests/invitation'
import { getCode } from '../requests/profile';
import  getInvitationCode  from '../hooks/getInvitationCode';
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
   console.log(email)
   if(email.count > 0 || email == null){
    setValidEmail(false);
    alert('Email in use')
     return;
   }


  
   const newUser = await registerUser(value)
   console.log(newUser);
  
    if(newUser){
      setCurrentUser(await newUser)
      console.log(currentUser);
      if(inviteCode!=='' && inviteCode !== null){
        const saveInvitationresponse = saveInvitation(inviteCode ,newUser.id)
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
     
     console.log(res);
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
   </div> : <Profile user={user} />
   }
   </>
  )
}



const Profile = ({user}) => {
  const [userShareCode, setUserShareCode ] = useState('')
  const CopyToClipBoard = (e) => {
    navigator.clipboard.writeText(e.target.value)
}


useEffect(async()=>{
  const response = getCode(user.id)
  .then((res)=>{
     
    return res;
  })
  .catch((e)=>{e})
 const result = await response;
 setUserShareCode(result.invite_id); 
},)
  return (
    
    <div  className="relative z-10 w-full lg:p-12 pt-10 registerMask lg:w-1/2 bg-black-50">
      {console.log(user)}
     	<h1 className="mb-2 uppercase text-30px font-morgan text-yellow">
				Welcome Back {user.user_metadata.rivalID}!
			</h1>
			<p className="text-white text-14px pb-20">
				The Rival ID is your gateway to the Bit Rivals ecosystem. 
			</p>
      <div className='flex flex-col'>
      <label className='pt-10 text-gray-300 text-14px'>Your share URL</label>
      <input type="text" value={"Bitrivals.gg/?invite="+userShareCode } id='inviteInput'  className={'text-center  text-pink bg-transparent cursor-pointer ' } onClick={(e)=> {CopyToClipBoard(e)}}/>
      </div>
     
\

    </div>
  )
}


const registerUser = async value => {
  // call default function in pages/api/register
  // send the email and password from form submission event to that endpoint
  const res = await fetch("/api/auth/register", {
    body: JSON.stringify({
      email: value.email,
      password: value.password,
      rivalID: value.rivalID
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
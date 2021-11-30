import supabase from '../utils/supabaseClient'
import {Formik, Form, Field, useFormik } from "formik";
import router, {useRouter} from 'next/router'
import {Step1, Step2, Step3, LoggedInRegisterID} from './RegistrationSteps'
import Profile from './Profile/Profile';
import ReferralCode from './Blocks/ReferralCode';
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

export default Register;
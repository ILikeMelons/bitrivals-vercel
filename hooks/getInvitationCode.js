import { useState, useEffect } from 'react';

export default function getInvitationCode() {

  const hasWindow = typeof window !== 'undefined';
  const [invitationCode, setInvitationCode] = useState('');



  useEffect(() => {
    if (hasWindow) {
      setInvitationCode(getReservationCode())
    }
  }, [invitationCode]);

  return invitationCode;
}



export const isInvite = () => {
  const invitationcode = getCurrentUrl();
  if(invitationcode.length < 1 ){
      return false;
  }

  return true;

}

export const getReservationCode = () => {
  if(isInvite){
     const code = getCurrentUrl();
     return code[1];
  }
  return '';
}

const getCurrentUrl = () => {
  const invitation = window.location.search;
  const getCode = invitation.split('=');
 
  return getCode;
}
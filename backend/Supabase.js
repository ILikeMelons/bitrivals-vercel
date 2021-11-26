import { supabase } from "../utils/supabaseClient";
var randomstring = require("randomstring");

//to optimize
//Save usernames in a state and only load once it opens up
export const checkRivalID = async(value) => {
   

    const rivalID = value.toString();
    const response = supabase.rpc('VerifyRivalID', {rivalid : rivalID})
    .then((response) => {
        return response;
    }).catch((e)=>
        {return e;}
    )
    
    return response;
    
 
}

export const verifyEmailInUse = async(email) => {
   
    const response = supabase
    .rpc('VerifyEmail',  {email : email}).then(res =>
        {
            return res;
        }).catch(e => {
            return e;
        })
 

    return response;
}


export const insertUserShareCode = async(id) => {
    const invitation  = randomstring.generate(10)
    
    const {data, error} = await supabase.from('profiles').update({invite_id : invitation}).match({id : id})

    if(data){
        return invitation
    }else{
        return error
    }
}


export const insertWalletAtID = async(wallet, id) => {
    const {data, error} = await supabase.from('profiles').update({wallet_adress : wallet}).match({id : id})

    if(data){
        return true
    }else{
        return false
    }
}


export const insertRivalID = async(userID, rivalID, userEmail) => {
    
  
    return await supabase.from('profiles').insert([
        {id: userID, rivalid: rivalID, user_email : userEmail }
    ]);
  }




  export const incrementInvitationUse = async(shareCode) => {
    
    const code = shareCode.trim();
    const response = supabase
    .rpc('IncrementUseByInviteId',  {inviteid : code}).then(res =>
        {
            return res;
        }).catch(e => {
            return e;
        })

    return response;
  }


  export const verifyShareCode = async(shareCode) => {

    const code = shareCode.trim();
    const response = supabase
    .rpc('VerifyInviteCode',  {code : code}).then(res =>
        {
            return res;
        }).catch(e => {
            return e;
        })

    return response;
  }


  export const saveInviteCodeUsed = async(shareCode, id) => {
      const code = shareCode.trim();
      const response = await supabase.from('invitesUsed').insert([
        {id: id, used_code:shareCode }
    ]);
    return response;
  }


  export const getReferralCode = async(id) => {
      const response = await supabase.from('profiles')
      .select('invite_id').eq('id', id).then((res) =>{return res}).catch((e)=>{return e});
    return response;
      
  }

  export const getUserRivalID = async(id) => {
    const response = await supabase.from('profiles')
    .select('rivalid').eq('id', id).then((res) =>{return res}).catch((e)=>{return e});
    return response;
  }


  export const signInUser = async(email, password) => {
      const response = await supabase.auth.signIn({
        email: email,
        password: password,
      })
      return response;
  }

export const countShareTimes = async(shareCode) => {
    shareCode = "QkU52HkzUA";
    const response = await supabase.from('invitesUsed').select('*', {count : "exact"}).eq('used_code', shareCode)
    //console.log(response);
    return response;
}
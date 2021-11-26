import {checkRivalID, insertRivalID, insertUserShareCode, getUserRivalID, verifyEmailInUse, signUpUser, saveInviteCodeUsed, incrementInvitationUse} from '../../../backend/Supabase'


export default async function registerRivalID(req, res) {
    // destructure the e-mail and password received in the request body.
    const { id, rivalID, email, password, inviteCode } = req.body;
    var userID = id;
    var newUser = {};
    let  validID, validEmail = false;
    const idData = await checkRivalID(rivalID);
    const emailCheck = await verifyEmailInUse(email);
    
    if(emailCheck.data == 0){
        validEmail = true
    }


    if(idData.data == 0){
        validID = true
    }

   if(validID && validEmail){
       //this means we are in registration mode
        if(userID.length == 0 && password.length > 0){
            const userSignUp = await signUpUser(email,rivalID,password);
            
            if(userSignUp.user!==null){
                newUser = userSignUp.user;
                userID = newUser.id;
            }else{
                return res.status(200).json({validID : validID, validEmail : validEmail, errorMsg : 'Unable to add user'})
            }

            if(inviteCode.length> 0){
                saveInviteCodeUsed(inviteCode, userID);
                incrementInvitationUse(inviteCode);
            }
            
            
        }

         let {d, e} = await insertRivalID(userID, rivalID, email);
         let {data, err} = await getUserRivalID(userID);
         let code = await insertUserShareCode(userID);
        
        return res.status(200).json({validID : validID, validEmail : validEmail, invitation : code, rivalID : data[0].rivalid, user : newUser, errorMsg : ''})
   }

   return res.status(200).json({validID : validID, validEmail : validEmail, errorMsg : ''});
  }
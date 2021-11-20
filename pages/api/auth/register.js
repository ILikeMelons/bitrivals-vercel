import { supabase } from "../../../utils/supabaseClient"
import { insertRivalID } from "../../../backend/Supabase"

export default async function registerUser(req, res) {
    // destructure the e-mail and password received in the request body.
    const { email, password, rivalID } = req.body
   
    //make a SignUp attempt to Supabase and
    // capture the user (on success) and/or error.
  
    let { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    },
    {
        data: {
            rivalID:rivalID
        }
    })

    // Send a 400 response if something went wrong
    if (error) return res.status(error.status).json({ error: error.message })
    
    let {data, errorOnId} = await insertRivalID(user.id, rivalID, user.email);
    if(errorOnId) return res.status(errorOnId.status).json({error: errorOnId.message});
    // Send 200 success if there were no errors!
    // and also return a copy of the object we received from Supabase
    return res.status(200).json({ user: user })
  }



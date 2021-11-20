

import { supabase } from "../../../utils/supabaseClient"


export default async function loginUser(req, res) {
    // destructure the e-mail and password received in the request body.
    const { email, password } = req.body
   
    console.log(email);
  
    let { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })
    // Send a 400 response if something went wrong
    if (error) return res.status(401).json({ error: error.message })
    // Send 200 success if there were no errors!
    // and also return a copy of the object we received from Supabase
    return res.status(200).json({ user: user })
  }

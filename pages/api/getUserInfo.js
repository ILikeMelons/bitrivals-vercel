import { supabase } from "../../utils/supabaseClient";

export default async function getUserInfo(req, res) {
  const { email, id, rivalID } = req.body; 

  
  return res.status(200).json({ user: user });
}
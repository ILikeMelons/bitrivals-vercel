import { getUserRivalID } from "../../../backend/Supabase";

export default async function load(req, res) {
    const {id} = req.body;
   const rivalID = await getUserRivalID(id);

   return res.status(200).json(rivalID.data[0])
  }
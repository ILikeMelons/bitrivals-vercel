import { getUserRivalID, countShareTimes } from "../../../backend/Supabase";

export default async function load(req, res) {
    const {id, shareCode} = req.body;
   const data = await getUserRivalID(id);
    const rivalID = data.data[0].rivalid
    
   const countData = await countShareTimes(shareCode);
   
   return res.status(200).json({rivalID : rivalID, referalCount : countData.count})
  }
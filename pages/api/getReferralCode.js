import { getReferralCode } from "../../backend/Supabase";

export default async function getReferral(req, res) {
    const {id} = req.body
    const response = getReferralCode(id).then((res)=> {return res}).catch((e) => {return e});
    console.log(await response);
    const result = await response;
    return res.status(200).json(result.data);
  }
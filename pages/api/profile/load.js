import { getUserRivalID, countShareTimes, getUserWalletAdress, getReferralCode } from "../../../backend/Supabase";

export default async function load(req, res) {
    const {id, shareCode} = req.body;
    var userShareCode = shareCode;

    const data = await getUserRivalID(id);
    const rivalID = data.data[0].rivalid;
    const walletData = await getUserWalletAdress(id);
    const walletAdress = walletData.data[0].wallet_adress;
    if(userShareCode.length == 0){
        const ShareCodedata = await getReferralCode(id);
        userShareCode = ShareCodedata.data[0].invite_id;
    }
   const countData = await countShareTimes(userShareCode);
   return res.status(200).json({rivalID : rivalID, referalCount : countData.count, wallet : walletAdress})
  }
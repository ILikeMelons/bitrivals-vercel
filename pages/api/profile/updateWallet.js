import { insertWalletAtID } from "../../../backend/Supabase";

export default async function updateWallet(req, res) {
    const {id, wallet} = req.body;

  
    if(id.length< 10){
        res.status(401).json({ error:'unauthorized' });
    }
    const result = await insertWalletAtID(wallet, id);


   return res.status(200).json({statusText : result.statusText})
  }
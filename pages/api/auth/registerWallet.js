import { insertWalletAtID } from '../../../backend/Supabase';


export default async function registerWallet(req, res){
     const {address, id} = req.body;
  
    if(id.length< 10){
        res.status(401).json({ error:'unauthorized' });
    }
    const result = await insertWalletAtID(address, id);
    //(result)
    return res.status(result.status).json({statusText : result.statusText});	
}
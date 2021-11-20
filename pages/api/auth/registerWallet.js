import { insertWalletAtID } from '../../../backend/Supabase';


export default async function registerWallet(req, res){
     const {address, user} = req.body;
  
    if(!user){
        res.status(401).json({ error:'unauthorized' });
    }
    const result = insertWalletAtID(address, user.id)
    .then(response => {
        return res.status(200).json(response)
    }).catch(e => {
        return res.status(402).send(e)
    })

    return result;	
}
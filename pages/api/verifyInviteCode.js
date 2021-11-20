import { verifyShareCode } from '../../backend/Supabase'


export default async function verifyInviteCode(req,res){
    const {id} = req.body;

    const response = verifyShareCode(id)
    .then(response => {
    
        return res.status(200).json({shareCode : response});
    }).catch(e=> {
        return res.status(500).json(e);
    })



   return response;

}
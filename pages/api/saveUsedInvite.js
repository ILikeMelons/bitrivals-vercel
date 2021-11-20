import {saveInviteCodeUsed, incrementInvitationUse} from '../../backend/Supabase'

export default async function save(req,res){

    const {id, share_code} = req.body;

    const response = saveInviteCodeUsed(share_code, id)
    .then(response => {
        return response;
    }).catch(e=> {
        return e;
    })
    const increment = incrementInvitationUse(share_code).then((res)=> {return res}).catch(e=>{return e})


   return res.status(200).json(response);

}
import {incrementInvitationUse} from '../../backend/Supabase'


export default async function incrementInvitation(req,res){
 
    const response = incrementInvitationUse('test')
    .then(response => {
        return res.status(200).json({ valid:true });
    }).catch(e=> {
        return res.status(e.status).json({ valid:false });
    })

   return response;

}
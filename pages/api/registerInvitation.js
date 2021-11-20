import { insertUserShareCode } from '../../backend/Supabase'


export default async function registerInvitation(req,res){
    const {id} = req.body;
console.log("hello")
    const response = insertUserShareCode(id)
    .then(response => {
        console.log('my response ' +  response);
        return res.status(200).json({shareCode : response});
    }).catch(e=> {
        return res.status(500).json(e);
    })

   return response;

}
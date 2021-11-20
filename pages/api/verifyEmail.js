import { verifyEmailInUse } from '../../backend/Supabase'

export default async function verifyEmail(req,res){
    const {email} = req.body;

    const response = verifyEmailInUse(email)
    .then(response => {
        let count = 0;
        if(response.data !== undefined){
            count=response.data;
        }
        return res.status(200).json({count : count});
    }).catch(e=> {
        return res.status(e.status).json({ count:-1 });
    })

   return response;

}
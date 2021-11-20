import { registerUser } from '../../backend/MailerLite'

export default async function registerSubscriber(req,res){
    const {email} = req.body;

    const response = registerUser(email)
    .then(response => {
    
        return res.status(200).json({ valid:true });
    }).catch(e=> {
        return res.status(e.status).json({ valid:false });
    })

   return response;

}
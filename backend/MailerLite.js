const MailerLite = require('mailerlite-api-v2-node').default
const MailAPI_Key = process.env.MAILERLITE_API_KEY
const HTTPHEADER = 'X-MailerLite-ApiKey'
const mailerLite = MailerLite(MailAPI_Key);


export const registerUser = async(email) => {
   
 
    const subscriber ={
        'email' : email
        }

    const response =  mailerLite.addSubscriber(subscriber).then(res=> {
        return true;
    }).catch(err => {
      
        return false;
    })
   
    return response;
}
export const addWalletAddress = async(value, user) => {
 
    const res =  fetch("/api/auth/registerWallet", {
      body: JSON.stringify({
        address: value.walletAddress,
        user: user.user,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => {
        return response;
    }).catch(e=> {
        return e;
    })
    return res;
   
  }


export const verifyEmail = async(email) => {
    const res = fetch("/api/verifyEmail",{
          body: JSON.stringify({
            email: email
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then(response => {
            return response;
        }).catch((e)=> {return e})

        return res;
}

export  const SubscribeEmail = async(email) =>{
  const response = await fetch('/api/registerSubscriber',{
      body: JSON.stringify({
          email: email
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
  })

  const result = await response.json();

  return result.valid;
 
}  



export const registerUserComplete =  async(id, rivalID, email) => {
  // call default function in pages/api/register
  // send the email and password from form submission event to that endpoint
  return new Promise(async function(resolve, reject){
    const response = await fetch("/api/auth/registerRivalId", {
      body: JSON.stringify({
        id : id,
        rivalID: rivalID,
        email: email
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const result = await response.json();

    if(!result.validID){
      reject('ID already in use!')
    }

    
   
    resolve({invitation : result.invitation, rivalID : result.rivalID, msg : 'All good!'})

  })
   
  
}

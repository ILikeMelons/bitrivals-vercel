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

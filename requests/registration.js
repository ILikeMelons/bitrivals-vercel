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

export const submitWalletAddress =  async(id, walletAddress) => {
  return new Promise(async function(resolve, reject){
    const response =  await fetch("/api/auth/registerWallet", {
      body: JSON.stringify({
        address: walletAddress,
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result =await response.json();
    //console.log(result);
    if(result.statusText == 'OK'){
      resolve('Address added successfully!')
    }
    reject('Unable to add address!');
  })
}


export const registerUserComplete =  async(id, rivalID, email, password='', inviteCode='') => {
  return new Promise(async function(resolve, reject){
    const response = await fetch("/api/auth/registerRivalId", {
      body: JSON.stringify({
        id : id,
        rivalID: rivalID,
        email: email,
        password: password,
        inviteCode : inviteCode
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
    const result = await response.json();

    if(!result.validEmail){
      reject('Email already in use!')
    }

    if(!result.validID){
      reject('ID already in use!')
    }

    if(result.errorMsg.length > 0){
      reject(result.errorMsg);
    }
    
   
    resolve({invitation : result.invitation, rivalID : result.rivalID, user : result.user, msg : 'All good!'})

  })
}

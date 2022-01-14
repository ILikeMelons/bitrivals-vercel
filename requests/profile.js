import { wallet } from "../public";


export const getCode = async(id) => {
    const res = fetch("/api/getReferralCode",{
          body: JSON.stringify({
            id: id
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then(response => {
            return response;
        }).catch((e)=> {return e})
     
        const result = await res;
        const jsonFormat = await result.json()
      
        return jsonFormat[0];
}

export const updateWallet = async(id, wallet) => {
  return new Promise(async function(resolve, reject){
    const updateWallet = await fetch("/api/profile/updateWallet",{
      body: JSON.stringify({
        id: id,
        wallet : wallet
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
      const result = await updateWallet.json();
      
      resolve();
  
  });
}


export const loadProfile = async(id, shareCode) => {

  return new Promise(async function(resolve, reject){
    const loadProfile= await fetch("/api/profile/load",{
    body: JSON.stringify({
      id: id,
      shareCode : shareCode
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
    const result = await loadProfile.json();
    
    resolve({rivalID : result.rivalID, count : result.referalCount, wallet : result.wallet});

  });

 
}
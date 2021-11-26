

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
        //console.log("allo");
        const result = await res;
        const jsonFormat = await result.json()
        return jsonFormat[0];
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
    console.log(result.rivalID)
    resolve({rivalID : result.rivalID, count : result.referalCount});

  });

 
}
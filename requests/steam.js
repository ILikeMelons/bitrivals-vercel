export const loadDotaMatchHistory =  async(steam_id) => {
    return new Promise(async function(resolve, reject){
      const response = await fetch("/api/steam/getDotaMatches", {
        body: JSON.stringify({
            steam_id : steam_id
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      const result = await response.json();
      console.log(result)
     
      if(result.status==1){
        resolve({matches : result.matches, total : result.total_results})
      }
     reject('error')
  
    })
}
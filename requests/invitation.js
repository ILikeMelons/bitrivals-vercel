export const callIncrement = async value => {
    const res = await fetch("/api/incrementInvitation", {
      body: JSON.stringify({
        invitationId : value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
  
    const data = await res.json()
    return data;
     
    
  }

export const insertInvitation = async (id) => {

    const res = fetch("/api/registerInvitation", {
        body: JSON.stringify({
          id : id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => { 
          
        
        return response;
    
    })
      .catch(e => {return e})
      
    
      return res;
}


export const saveInvitation = async(code, id) => {

    const res = fetch("/api/saveUsedInvite", {
        body: JSON.stringify({
          id : id,
          share_code : code
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then((response) => { 
          
        
        return response;
    
    })
      .catch(e => {return e})
      
     
      return res;
}
  
export const login = async(pswd) => {
    return new Promise(async function(resolve, reject){
      const loginAdmin= await fetch("/api/admin/login",{
      body: JSON.stringify({
        password: pswd
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
      const result = await loginAdmin.json();
     
      if(result.success){
        resolve(result);
      }
      reject(result)
  
    });
  
   
  }


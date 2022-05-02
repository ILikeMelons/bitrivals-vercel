

export const loadExcel = async() => {
    return new Promise(async function(resolve, reject){
      const getSheet = await fetch('/api/presale/loadData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
        const result = await getSheet.json();
        (result);
        resolve();
    
    });
  }


  

export const checkAddress = async(address) => {
    (address);
    return new Promise(async function(resolve, reject){
      const check = await fetch('/api/presale/checkAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address : address}),
      });
        const result = await check.json();
        if(!result.bool)
        {
            reject({msg: 'You are not part of the private sale'});
        }else{
            resolve(result);
        }
    });
  }
  

  export const addAmount = async(address, ammount) => {
    (address);
    return new Promise(async function(resolve, reject){
      const check = await fetch('/api/presale/updateAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address : address, ammount :ammount}),
      });
        const result = await check.json();
        (result);
        if(!result.bool)
        {
            reject({msg: 'You are not part of the private sale'});
        }else{
            resolve({ammount : result.ammountSpent});
        }
    });
  }

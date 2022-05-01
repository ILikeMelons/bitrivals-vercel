const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json');

var doc = null;
var sheet = null;

export const loadSheet = async() => {
  doc = new GoogleSpreadsheet('1lB8JVOq9xcwDDBOCs7cHW4kJS1JKHh8koQr5sLKJjeg');
  await doc.useServiceAccountAuth(creds);
  const info = await doc.loadInfo();
  sheet = doc.sheetsByIndex[0];
}

export const checkAddress = async(address) => {
  console.log('in checkAddress');
  var inWhitelist = false;
  await sheet.loadCells('A1:C200')
  console.log(sheet.cellStats);
  for(var i =0; i<200; i++){
    const cellA = sheet.getCell(i,0);
    const cellC = sheet.getCell(i,2);
    
    if(address === cellA.value ){
      var ammountSpent = 0; 
      if(cellC.value !== null){
        ammountSpent = parseInt(cellC.value);
      } 
      return {bool : true, ammountSpent : ammountSpent};
    }
  }
  console.log(`found nothing ${address}`)
  return {bool : false, ammountSpent : 0};;
 
}


export const addValueSpent = async(address, ammountAdded)=>{
  console.log('in addValueSpent');
  await sheet.loadCells('A1:C200')

  for(var i =0; i<200; i++){
    const cellA = sheet.getCell(i,0);
    const cellC = sheet.getCell(i,2);
    if(address === cellA.value ){
      var ammount = 0;
      var total = 0;
      if(cellC.value.length !== 0){
        ammount = parseInt(cellC.value);
      }
      total = ammount + parseInt(ammountAdded);
      const rows = await sheet.getRows();
      rows[i].Spent = total;
      await rows[i].save();
      return {bool : true, ammountSpent : total};
    }
  }
  return {bool : false, discordName : ''};;
}

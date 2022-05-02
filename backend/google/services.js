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
    const cellB = sheet.getCell(i,1);
    const cellC = sheet.getCell(i,2);
    
    if(address === cellA.value ){
      var ammountSpent = 0; 
      if(cellC.value !== null){
        ammountSpent = parseFloat(cellC.value);
      } 
      return {bool : true, ammountSpent : ammountSpent, maxContribution: cellB.value};
    }
  }
  console.log(`found nothing ${address}`)
  return {bool : false, ammountSpent : 0};;
 
}


export const addValueSpent = async(address, ammountAdded)=>{
  console.log('in addValueSpent');
  await sheet.loadCells('A1:C200')
 try{
  for(var i =0; i<200; i++){
    const cellA = sheet.getCell(i,0);
    const cellC = sheet.getCell(i,2);
    if(address === cellA.value ){
      var ammount = 0;
      var total = 0;
      if(cellC.value !== null){
        ammount = parseFloat(cellC.value);
      }
      total = ammount + parseFloat(ammountAdded);
      cellC.value = total;
      await sheet.saveUpdatedCells();
      return {bool : true, ammountSpent : total};
    }
  }
  return {bool : false };
 }catch(e){
  return {bool : false };
 }
  
  
}

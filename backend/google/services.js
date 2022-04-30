const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json');

var doc = null;
var sheet = null;

exports.loadSheet = async() => {
  doc = new GoogleSpreadsheet('1i8xtc1J1ck9Q2ePYpGq1B_Ge4f6N6MsFu8cZV70TxyQ');
  await doc.useServiceAccountAuth(creds);
  const info = await doc.loadInfo();
  sheet = doc.sheetsByIndex[0];
}

exports.checkAddress = async(address) => {
  console.log('in checkAddress');
  var inWhitelist = false;
  await sheet.loadCells('A1:B200')
  console.log(sheet.cellStats);
  for(var i =5; i<200; i++){
    const cellA = sheet.getCell(i,0);
    const cellB = sheet.getCell(i,1);
    if(address === cellB.value ){
      return {bool : true, discordName : cellA.value};
    }
  }
  return {bool : false, discordName : ''};;
 
}

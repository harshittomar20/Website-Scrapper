const url = "https://en.wikipedia.org/wiki/H#Use_in_writing_systems";
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");



request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);
    }else{
    
        //console.log(html);
        extractLink(html);
    }
}

function extractLink(html){
    let $ = cheerio.load(html);
    
    let english =  $('#mw-content-text > div.mw-parser-output > p:nth-child(23)');
    let otherLng1 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(25)');
    let otherLng2 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(26)');
    let otherLng3 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(27)');
    let otherLng4 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(28)');
    let otherLng5 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(29)');
    let otherLng6 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(30)');
    let otherLng7 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(31)');
    let otherLng8 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(32)');
    let otherLng9 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(33)');
    let otherLng10 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(34)');
    let otherSys = $('#mw-content-text > div.mw-parser-output > p:nth-child(36)'); 
    let otherLng = otherLng1.text()+otherLng2.text()+otherLng3.text()+otherLng4.text()+otherLng5.text()+otherLng6.text()+otherLng7.text()+otherLng8.text()+otherLng9.text()+otherLng10.text();
    
    processText(english.text(),otherSys.text(),otherLng);
    
}
 
function processText(english,otherSys,otherLng){
         let textPath = path.join(__dirname,"H","Other");
         dirCreater(textPath);
         let filePath = path.join(textPath,"write.xlsx");
         let content = excelReader(filePath,"Other");
         let historyObj = {
            english,
            otherSys,
            otherLng
         }
         content.push(historyObj);
         excelWriter(filePath,content,"Other");
}

function dirCreater(filePath){
    if(fs.existsSync(filePath)== false){
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath, json, sheetName) {
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    xlsx.writeFile(newWB, filePath);
}

function excelReader(filePath, sheetName) {
    if (fs.existsSync(filePath) == false) {
        return [];
    }
    let wb = xlsx.readFile(filePath);
    let excelData = wb.Sheets[sheetName];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}





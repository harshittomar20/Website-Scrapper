const url = "https://en.wikipedia.org/wiki/H#History";
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
    
    let anchorElem1 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(13)');
    let anchorElem2 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(14)');
    let anchorElem3 =  $('#mw-content-text > div.mw-parser-output > p:nth-child(15)');

    processText(anchorElem1.text(),anchorElem2.text(),anchorElem3.text());
    //console.log(anchorElem1.text());
    //console.log(anchorElem2.text());
    //console.log(anchorElem3.text());  
}
 
function processText(anchorElem1,anchorElem2,anchorElem3){
         let textPath = path.join(__dirname,"H","History");
         dirCreater(textPath);
         let filePath = path.join(textPath,"brief.xlsx");
         let content = excelReader(filePath,"History");
         let historyObj = {
             anchorElem1,
             anchorElem2,
             anchorElem3
         }
         content.push(historyObj);
         excelWriter(filePath,content,"History");
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





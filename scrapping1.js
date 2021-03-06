const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var connectDB = require('./database01.js');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var notice02Schema = new Schema({notice02: [String]})//create schema
var Notice02Model = mongoose.model('notice2',notice02Schema);//create model
var notice02Model = new Notice02Model();//create document
var firstTry = false;

async function getNotice02(){
  const browser = await puppeteer.launch({
    headless : true
  });
  const page = await browser.newPage();
  await page.goto('https://cs.nsu.ac.kr/?m1=page%25&menu_id=681%25'); //취업정보 url
  const content = await page.content();
  const $ = cheerio.load(content);

  var notice02=["forSaveNotice02"];
      for(i = 1; i<10; i++){
        notice02.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div > table > tbody > tr:nth-child("+i+") > td.tit").text());
        console.log("취업정보"+i+"번째 크롤링값 = "+notice02[i]);
  }
  console.log("Notie02 DB CONNECT");
  connectDB.connect();
  if(firstTry){
    notice02Model.notice02 = notice02;
    notice02Model
      .save()
      .then(newNotice02 => {
        console.log("notice02 save 완료");
      })
      .catch(err => {
        console.log(err);
      });
      firstTry = false;
}
else if(!firstTry){
  var opts = {new : true};
  Notice02Model.findOneAndUpdate({name : 'notice02'},{notice02 : notice02},opts,function(err,result){
        if(err) console.log(err);
        else console.log("notices02 update complete!");
      });
    }
await browser.close();  //await connectDB.disconnect();
};
module.exports ={getNotice02};




// await page.setViewport({
//   width: 1366,
//   height: 768
// });

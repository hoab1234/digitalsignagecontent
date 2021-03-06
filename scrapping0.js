
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var connectDB = require('./database01.js');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notice01Schema = new Schema({notice01: [String]})//create schema
var Notice01Model = mongoose.model('notice',notice01Schema);//create model
var notice01Model = new Notice01Model();//create document

var firstTry = true;

async function getNotice01(){
  const browser = await puppeteer.launch({
    headless : false
  });
  const page = await browser.newPage();
  await page.goto('https://cs.nsu.ac.kr/?m1=page%25&menu_id=678%25'); //공지사항 url
  const content = await page.content();
  const $ = cheerio.load(content);

  var notice01=["forSaveNotice01"];
  for(i = 1; i<11; i++){
    notice01.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div > table > tbody > tr:nth-child("+i+") > td.tit").text());
    console.log(i+"번째 크롤링값 = "+notice01[i]);
  }
  console.log("Notie01 DB CONNECT");
  connectDB.connect();
  if(firstTry){
    notice01Model.notice01 = notice01;
    notice01Model
      .save()
      .then(newNotice01 => {
        console.log("notice01 save 완료");
      })
      .catch(err => {
        console.log(err);
      });
      firstTry = false;
}
else if(!firstTry){
  var opts = {new : true};
  Notice01Model.findOneAndUpdate({name : 'notice01'},{notice01 : notice01},opts,function(err,result){
        if(err) console.log(err);
        else console.log("notices update complete!");
      });
    }
await browser.close();  //await connectDB.disconnect();
}; module.exports ={getNotice01};




// await page.setViewport({
//   width: 1366,
//   height: 768
// });

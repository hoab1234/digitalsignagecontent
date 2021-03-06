const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var connectDB = require('./database01.js');
var mongoose = require("mongoose");

var Schema = mongoose.Schema;//create schema
var paraSchema = new Schema({paragraph: [String]})//create model
var ParaModel = mongoose.model('Para',paraSchema);//create document
var paraModel = new ParaModel();
var firstTry = false;

async function getPara(){
  const browser = await puppeteer.launch({
    headless : true
  });
  const page = await browser.newPage();

  await page.goto('https://nsu.ac.kr/?m1=page%25&menu_id=272%25');
  const content = await page.content();
  const $ = cheerio.load(content);

  var para=["forSaveScrappingData"];
  para.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div:nth-child(5)").text());
  para.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div:nth-child(9)").text());
  para.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div:nth-child(13)").text());
  para.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div:nth-child(17)").text());
  para.push($("#wrapper > div.page1 > div > div.container > div.detail_info.container > div:nth-child(21) > ul > li").text());
  console.log("para DB CONNECT");
  connectDB.connect();
  if(firstTry){
    paraModel.paragraph = para;
    paraModel
      .save()
      .then(newPara => {
        console.log("save 완료");
      })
      .catch(err => {
        console.log(err);
      });
      firstTry = false;
}else if(!firstTry){
//update para document
  var opts = {new : true};
  ParaModel.findOneAndUpdate({name : "para"},{paragraph:para},opts,function(err,result){
      if(err) console.log(err);
      else console.log("paras update complete!");
    });
  }
await browser.close();  //await connectDB.disconnect();
}; module.exports ={getPara};





//-----------------
// await page.setViewport({
//   width: 1366,
//   height: 768
// });

const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
var connectDB = require('./database01.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;//create schema
var companySchema = new Schema({company: [String], compSrc: [String]})//create model
var CompanyModel = mongoose.model('Company',companySchema);//create document

var company01Model = new CompanyModel();
var company02Model = new CompanyModel();
var company03Model = new CompanyModel();
var company04Model = new CompanyModel();
var company05Model = new CompanyModel();
var company06Model = new CompanyModel();

var firstTry = false;

async function getCompany(){
  const browser = await puppeteer.launch({
    headless : false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768
  });
  await page.goto('https://www.jobkorea.co.kr/user/careerpath/result?school=U0061&major=11278');
  const content = await page.content();
  const $ = cheerio.load(content);

  var company01=["대기업"];
  var comp01src=["대기업로고"]

  var company02=["대기업계열사"];
  var comp02src=["대기업계열사로고"];

  var company03=["중견기업"];
  var comp03src=["중견기업로고"];

  var company04=["외국계"];
  var comp04src=["외국계로고"];

  var company05=["공공기관"];
  var comp05src=["공공기관로고"];

  var company06=["중소기업"];
  var comp06src=["중소기업로고"];

  for(i=1; i<6 ; i++){
    company01.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(3) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp01src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(3) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));

    company02.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(4) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp02src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(4) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));

    company03.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(5) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp03src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(5) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));

    company04.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(6) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp04src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(6) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));

    company05.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(7) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp05src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(7) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));

    company06.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(8) > div > ul > li:nth-child("+i+") > div.com > a > span").text());
    comp06src.push($("#container > div > div.cpCntWrap > div > div.cpCnt > div:nth-child(4) > div:nth-child(8) > div > ul > li:nth-child("+i+") > div.logo > a > span:nth-child(1) > img").attr('src'));
  }


  connectDB.connect();
  console.log("db connect...");

  if(firstTry){
    company01Model.company = company01;
    company01Model.compSrc = comp01src;
    company01Model
      .save()
      .then(newCompany => {
        console.log("company01 save 완료");
      })
      .catch(err => {
        console.log(err);
      });
      company02Model.company = company02;
      company02Model.compSrc = comp02src;
      company02Model
        .save()
        .then(newCompany => {
          console.log("company02 save 완료");
        })
        .catch(err => {
          console.log(err);
        });
        company03Model.company = company03;
        company03Model.compSrc = comp03src;
        company03Model
          .save()
          .then(newCompany => {
            console.log("company03 save 완료");
          })
          .catch(err => {
            console.log(err);
          });
          company04Model.company = company04;
          company04Model.compSrc = comp04src;
          company04Model
            .save()
            .then(newCompany => {
              console.log("company04 save 완료");
            })
            .catch(err => {
              console.log(err);
            });
            company05Model.company = company05;
            company05Model.compSrc = comp05src;
            company05Model
              .save()
              .then(newCompany => {
                console.log("company05 save 완료");
              })
              .catch(err => {
                console.log(err);
              });
              company06Model.company = company06;
              company06Model.compSrc = comp06src;
              company06Model
                .save()
                .then(newCompany => {
                  console.log("company06 save 완료");
                })
                .catch(err => {
                  console.log(err);
                });
      firstTry = false;
}else if(!firstTry){
//update para document
  var opts = {new : true};
  CompanyModel.findOneAndUpdate({name : "company01"},{company:company01, compSrc:comp01src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company01 update complete!");
    });

  CompanyModel.findOneAndUpdate({name : "company02"},{company:company02, compSrc:comp02src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company02 update complete!");
    });

  CompanyModel.findOneAndUpdate({name : "company03"},{company:company03, compSrc:comp03src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company03 update complete!");
    });

  CompanyModel.findOneAndUpdate({name : "company04"},{company:company04, compSrc:comp04src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company04 update complete!");
    });

  CompanyModel.findOneAndUpdate({name : "company05"},{company:company05, compSrc:comp05src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company05 update complete!");
    });

  CompanyModel.findOneAndUpdate({name : "company06"},{company:company06, compSrc:comp06src },opts,function(err,result){
      if(err) console.log(err);
      else console.log("company06 update complete!");
    });
  }


await browser.close();  //await connectDB.disconnect();
}; module.exports ={getCompany};

getCompany();

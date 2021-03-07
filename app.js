
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => { // get 메소드 일때,
  res.send('Hello World!')  //  응답 보내기
})

const {getPara} = require("./scrapping.js");
const {getNotice01} = require("./scrapping0.js");
const {getNotice02} = require("./scrapping1.js");
const {getCompany} = require("./scrap_company.js");

getPara();
getNotice01();
getNotice02();
getCompany();

const cron = require('node-cron');
async function handleAsync() {
  const todo0 = await getPara();
  const todo1 = await getNotice01();
  const todo2 = await getNotice02();
  const todo3 = await getCompany();
}
//1분마다 실행
cron.schedule("* * * * *", async () =>{
  console.log("running a task");
  await handleAsync();
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//월요일 ~금요일까지 매일 12시에 주기적으로 실행
//()
//connectDB.connect(); 6번라인
// var connectDB = require('./database01.js');

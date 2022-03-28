const PORT = 8000;
const express = require("express");
const app = express();
// 非同期通信でデータを取得するためのモジュール
const axios = require("axios");
const cheerio = require("cheerio");


// ウェブスクレイピングを作成していく
const URL = "https://search.rakuten.co.jp/search/mall/keyboard/";
const data = [];

// axiosに対して指定したURLを取ってきてとする。⇨promiseオブジェクト、つまり非同期処理で返ってくるのでthen()で繋げる
axios(URL).then((res) => {
  const htmlParser = res.data;
  // console.log(htmlParser);
  
  // cheerioにあるload()関数にloadingしたいものを入れる事で簡単にロードできる。
  // 又、こうすることで＄でスプレイピングできるようになる。
  const $ = cheerio.load(htmlParser);
  $(".searchresultitem", htmlParser).each(function() {
    const title = $(this).find(".title").text();
    console.log(title);
    const price = $(this).find(".important").text();
    data.push({title, price});
    console.log(data);
  })
}).catch((e) => console.log(e));


app.listen(PORT, console.log("Server is runnning!"));



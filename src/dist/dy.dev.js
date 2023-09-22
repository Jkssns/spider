"use strict";

var axios = require('axios');

function stringToBase64(str) {
  return new Buffer.from(str).toString("base64");
}

var spider = function spider(url) {
  axios.get(url, {
    headers: {
      Authorization: 'Basic ' + stringToBase64('admin:admin')
    }
  }).then(function (res) {
    console.log('res::: ', res);
  });
};

var url = 'https://ssr3.scrape.center/page/';

for (var i = 1; i <= 1; i++) {
  spider(url + i);
}
"use strict";

var spiderImg = require('./index');

var url = "https://api.ihansen.org/img/detail?&perPage=9&index=&orderBy=my_downloads&tag=%E7%BE%8E%E5%A5%B3&favorites=&page=";

for (var i = 1; i <= 1; i++) {
  spiderImg({
    url: url + 2,
    filePath: '../temp',
    handleResCallback: function handleResCallback(arr, res) {
      res.data.forEach(function (item) {
        arr.push(item.bigUrl);
      });
    }
  });
}
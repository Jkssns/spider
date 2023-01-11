"use strict";

var cheerio = require('cheerio');

var spiderImg = require('./index');

var url = 'http://qianye88.com/so/7/';

for (var i = 1; i <= 1; i++) {
  spiderImg({
    url: url + i,
    filePath: '../temp',
    handleResCallback: function handleResCallback(arr, res) {
      var $ = cheerio.load(res.data);
      $('img.lazy').each(function (i, el) {
        var str = $(el).attr('data-original').split('?')[0];
        arr.push(str);
      });
    }
  });
}
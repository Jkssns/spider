"use strict";

var cheerio = require('cheerio');

var spiderImg = require('./index');

var url = 'https://bing.ioliu.cn?p=';

for (var i = 1; i <= 1; i++) {
  spiderImg({
    url: url + i,
    filePath: '../temp',
    handleResCallback: function handleResCallback(arr, res) {
      var $ = cheerio.load(res.data);
      $('.options').each(function (i, el) {
        arr.push($(el).find('.download:first').attr('href'));
      });
    }
  });
}
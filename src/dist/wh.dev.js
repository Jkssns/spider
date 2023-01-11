"use strict";

var cheerio = require('cheerio');

var spiderImg = require('./index');

var url = 'https://wallhaven.cc/search?q=stockings&categories=110&purity=100&sorting=date_added&order=desc&page=';

for (var i = 1; i <= 2; i++) {
  spiderImg({
    url: url + i,
    filePath: '../temp',
    jpgMaybeNotJpg: true,
    handleResCallback: function handleResCallback(arr, res) {
      var $ = cheerio.load(res.data);
      $('.lazyload').each(function (i, el) {
        var str = $(el).attr('data-src').replace('//th', '//w').replace('/small/', '/full/');
        var strArr = str.split('/');
        strArr[strArr.length - 1] = 'wallhaven-' + strArr[strArr.length - 1];
        arr.push(strArr.join('/'));
      });
    }
  });
}
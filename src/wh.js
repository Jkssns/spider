const cheerio = require('cheerio');
const spiderImg = require('./index');

const url = 'https://wallhaven.cc/search?q=stockings&categories=110&purity=100&sorting=date_added&order=desc&page=';
for (let i=1; i<=2; i++) {
    spiderImg({
        url: url + i,
        filePath: '../temp',
        jpgMaybeNotJpg: true,
        handleResCallback: (arr, res) => {
            const $ = cheerio.load(res.data);
            $('.lazyload').each((i, el) => {
                const str = $(el).attr('data-src').replace('//th', '//w').replace('/small/', '/full/');
                const strArr = str.split('/');
                strArr[strArr.length - 1] = 'wallhaven-' + strArr.at(-1)
                arr.push(strArr.join('/'));
            })
        },
    })
}
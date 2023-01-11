const cheerio = require('cheerio');
const spiderImg = require('./index')

const url = 'http://qianye88.com/so/7/';
for (let i=1; i<=1; i++) {
    spiderImg({
        url: url + i,
        filePath: '../temp',
        handleResCallback: (arr, res) => {
            const $ = cheerio.load(res.data);
            $('img.lazy').each((i, el) => {
                const str = $(el).attr('data-original').split('?')[0];
                arr.push(str);
            })
        },
    })
}

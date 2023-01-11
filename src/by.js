const cheerio = require('cheerio');
const spiderImg = require('./index')

const url = 'https://bing.ioliu.cn?p=';
for (let i=1; i<=1; i++) {
    spiderImg({
        url: url + i,
        filePath: '../temp',
        handleResCallback: (arr, res) => {
            const $ = cheerio.load(res.data);
            $('.options').each((i, el) => {
                arr.push($(el).find('.download:first').attr('href'));
            })
        },
    })
}

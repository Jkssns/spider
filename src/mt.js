
const spiderImg = require('./index')

const url = `https://api.ihansen.org/img/detail?&perPage=9&index=&orderBy=my_downloads&tag=%E7%BE%8E%E5%A5%B3&favorites=&page=`;
for (let i=1; i<=1; i++) {
    spiderImg({
        url: url + 2,
        filePath: '../temp',
        handleResCallback: (arr, res) => {
            res.data.forEach(item => {
                arr.push(item.bigUrl);
            });
        },
    })
}
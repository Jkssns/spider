const axios = require('axios');
const request = require('request');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pageStr = (page) => `http://www.baba5.cc/chenqingmeimengdonghuyoutazuolaopo0/read_${page}.html`;
const arr = Array.from({length: 100}).fill(0).flatMap((i, index) => {
	return [pageStr(150 + index), pageStr(150 + index + '_2')]
})

console.log('arr::: ', arr.length);

(async function(array) {
	for (let item of array) {
		await axios.get(item).then((res) => {
			const $ = cheerio.load(res.data);
			// console.log(' : ', $('.pt-read-text').html());
			fs.writeFile(path.join('../txt/index.md'), $('.pt-read-text').html(), {encoding: 'utf8', flag: 'a'}, (err, data) => {
				// console.log('err, data::: ', err, data);
				console.log("item::: ", item);
			})
		})

		await new Promise((rel) => {
			setTimeout(() => {
				rel()
			}, 200)
		})
	}
}(arr))


const axios = require('axios');

function stringToBase64(str) {
	return new Buffer.from(str).toString("base64");
}

const spider = (url) => {
	axios.get(url, {
		headers: {
			Authorization: 'Basic ' + stringToBase64('admin:admin'),
		}
	}).then((res) => {
		console.log('res::: ', res);
	})
}

const url = 'https://ssr3.scrape.center/page/';
for (let i=1; i<=1; i++) {
    spider(url + i)
}
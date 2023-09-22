const axios = require('axios');
const request = require('request');
const fs = require('fs');
const path = require('path');

let index = 0;
module.exports = ({
	url,
	handleResCallback,
	filePath,
	jpgMaybeNotJpg = false,
}) => {
	const suffixArr = ['.jpg', '.png']
	axios.get(url, {responseType: 'arraybuffer'}).then(async (res) => {
		const arr = [];

		if (handleResCallback) {
			handleResCallback(arr, res)
		} else {
			throw new ReferenceError('没有处理返回值');
		}
    
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        
		for (let item of arr) {
            index++;
			const suffix = suffixArr.find(suf => item.includes(suf.toLocaleLowerCase())) || '.jpg';
            let name = index + suffix;
            if (jpgMaybeNotJpg) {
                let bool = true;
                await new Promise((rel, rej) => {
                    request(item, function(err, res) {
                        if (res.statusCode === 404) {
                            bool = false;
                        }
						rel();
                    })
                })
                if (bool) {
                    request(item).pipe(fs.createWriteStream(path.join(filePath, name), {'enconding':'binary'}));
                } else {
					name = name.replace('.jpg', '.png');
                    request(item.replace('.jpg', '.png')).pipe(fs.createWriteStream(path.join(filePath, name), {'enconding':'binary'}));
                }
            } else {
                // console.log("item::: ", item);
				await new Promise((rel, rej) => {
                    setTimeout(() => {
                        request(item).pipe(fs.createWriteStream(path.join(filePath, name), {'enconding':'binary'}));
                        rel();
                    }, 500)
                })
            }
        }
    }).catch(err => {
        console.log('err::: ', err);
    })
}
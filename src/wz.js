const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const spiderImg = require('./index');
const fs = require('fs');
const path = require('path');
const request = require('request');

const arr = [{"id":"514","name":"亚连"},];
const abb = [{"id":"514","name":"亚连"},{"id":"564","name":"姬小满"},{"id":"545","name":"莱西奥"},{"id":"544","name":"赵怀真"},{"id":"521","name":"海月"},{"id":"548","name":"戈娅"},{"id":"534","name":"桑启"},{"id":"542","name":"暃"},{"id":"540","name":"金蝉"},{"id":"538","name":"云缨"},{"id":"155","name":"艾琳"},{"id":"537","name":"司空震"},{"id":"528","name":"澜"},{"id":"536","name":"夏洛特"},{"id":"533","name":"阿古朵"},{"id":"527","name":"蒙恬"},{"id":"531","name":"镜"},{"id":"524","name":"蒙犽"},{"id":"525","name":"鲁班大师"},{"id":"523","name":"西施"},{"id":"518","name":"马超"},{"id":"522","name":"曜"},{"id":"506","name":"云中君"},{"id":"505","name":"瑶"},{"id":"529","name":"盘古"},{"id":"511","name":"猪八戒"},{"id":"515","name":"嫦娥"},{"id":"513","name":"上官婉儿"},{"id":"507","name":"李信"},{"id":"312","name":"沈梦溪"},{"id":"508","name":"伽罗"},{"id":"509","name":"盾山"},{"id":"137","name":"司马懿"},{"id":"510","name":"孙策"},{"id":"125","name":"元歌"},{"id":"504","name":"米莱狄"},{"id":"503","name":"狂铁"},{"id":"197","name":"弈星"},{"id":"502","name":"裴擒虎"},{"id":"176","name":"杨玉环"},{"id":"199","name":"公孙离"},{"id":"501","name":"明世隐"},{"id":"179","name":"女娲"},{"id":"198","name":"梦奇"},{"id":"194","name":"苏烈"},{"id":"195","name":"百里玄策"},{"id":"196","name":"百里守约"},{"id":"193","name":"铠"},{"id":"189","name":"鬼谷子"},{"id":"182","name":"干将莫邪"},{"id":"187","name":"东皇太一"},{"id":"191","name":"大乔"},{"id":"192","name":"黄忠"},{"id":"190","name":"诸葛亮"},{"id":"180","name":"哪吒"},{"id":"186","name":"太乙真人"},{"id":"184","name":"蔡文姬"},{"id":"183","name":"雅典娜"},{"id":"178","name":"杨戬"},{"id":"177","name":"成吉思汗"},{"id":"175","name":"钟馗"},{"id":"174","name":"虞姬"},{"id":"173","name":"李元芳"},{"id":"171","name":"张飞"},{"id":"170","name":"刘备"},{"id":"169","name":"后羿"},{"id":"168","name":"牛魔"},{"id":"167","name":"孙悟空"},{"id":"166","name":"亚瑟"},{"id":"163","name":"橘右京"},{"id":"162","name":"娜可露露"},{"id":"157","name":"不知火舞"},{"id":"156","name":"张良"},{"id":"154","name":"花木兰"},{"id":"153","name":"兰陵王"},{"id":"152","name":"王昭君"},{"id":"150","name":"韩信"},{"id":"149","name":"刘邦"},{"id":"148","name":"姜子牙"},{"id":"146","name":"露娜"},{"id":"144","name":"程咬金"},{"id":"142","name":"安琪拉"},{"id":"141","name":"貂蝉"},{"id":"140","name":"关羽"},{"id":"139","name":"老夫子"},{"id":"136","name":"武则天"},{"id":"135","name":"项羽"},{"id":"134","name":"达摩"},{"id":"133","name":"狄仁杰"},{"id":"132","name":"马可波罗"},{"id":"131","name":"李白"},{"id":"130","name":"宫本武藏"},{"id":"129","name":"典韦"},{"id":"128","name":"曹操"},{"id":"127","name":"甄姬"},{"id":"126","name":"夏侯惇"},{"id":"124","name":"周瑜"},{"id":"123","name":"吕布"},{"id":"121","name":"芈月"},{"id":"120","name":"白起"},{"id":"119","name":"扁鹊"},{"id":"118","name":"孙膑"},{"id":"117","name":"钟无艳"},{"id":"116","name":"阿轲"},{"id":"115","name":"高渐离"},{"id":"114","name":"刘禅"},{"id":"113","name":"庄周"},{"id":"112","name":"鲁班七号"},{"id":"111","name":"孙尚香"},{"id":"110","name":"嬴政"},{"id":"109","name":"妲己"},{"id":"108","name":"墨子"},{"id":"107","name":"赵云"},{"id":"106","name":"小乔"},{"id":"105","name":"廉颇"}];
const acc = [{"id":"514","name":"ya lian "},{"id":"564","name":"ji xiao man "},{"id":"545","name":"lai xi ao "},{"id":"544","name":"zhao huai zhen "},{"id":"521","name":"hai yue "},{"id":"548","name":"ge ya "},{"id":"534","name":"sang qi "},{"id":"542","name":"fei "},{"id":"540","name":"jin chan "},{"id":"538","name":"yun ying "},{"id":"155","name":"ai lin "},{"id":"537","name":"si kong zhen "},{"id":"528","name":"lan "},{"id":"536","name":"xia luo te "},{"id":"533","name":"a gu duo "},{"id":"527","name":"meng tian "},{"id":"531","name":"jing "},{"id":"524","name":"meng ya "},{"id":"525","name":"lu ban da shi "},{"id":"523","name":"xi shi "},{"id":"518","name":"ma chao "},{"id":"522","name":"yao "},{"id":"506","name":"yun zhong jun1 "},{"id":"505","name":"yao "},{"id":"529","name":"pan gu "},{"id":"511","name":"zhu ba jie "},{"id":"515","name":"chang e "},{"id":"513","name":"shang guan wan er "},{"id":"507","name":"li xin "},{"id":"312","name":"shen meng xi "},{"id":"508","name":"jia luo "},{"id":"509","name":"dun shan "},{"id":"137","name":"si ma yi "},{"id":"510","name":"sun ce "},{"id":"125","name":"yuan ge "},{"id":"504","name":"mi lai di "},{"id":"503","name":"kuang tie "},{"id":"197","name":"yi xing "},{"id":"502","name":"pei qin hu "},{"id":"176","name":"yang yu huan "},{"id":"199","name":"gong sun li "},{"id":"501","name":"ming shi yin "},{"id":"179","name":"nü wa "},{"id":"198","name":"meng qi "},{"id":"194","name":"su lie "},{"id":"195","name":"bai li xuan ce "},{"id":"196","name":"bai li shou yue "},{"id":"193","name":"kai "},{"id":"189","name":"gui gu zi "},{"id":"182","name":"gan jiang mo xie "},{"id":"187","name":"dong huang tai yi "},{"id":"191","name":"da qiao "},{"id":"192","name":"huang zhong "},{"id":"190","name":"zhu ge liang "},{"id":"180","name":"na zha "},{"id":"186","name":"tai yi zhen ren "},{"id":"184","name":"cai wen ji "},{"id":"183","name":"ya dian na "},{"id":"178","name":"yang jian "},{"id":"177","name":"cheng ji si han "},{"id":"175","name":"zhong kui "},{"id":"174","name":"yu ji "},{"id":"173","name":"li yuan fang "},{"id":"171","name":"zhang fei "},{"id":"170","name":"liu bei "},{"id":"169","name":"hou yi "},{"id":"168","name":"niu mo "},{"id":"167","name":"sun wu kong "},{"id":"166","name":"ya se "},{"id":"163","name":"ju you jing "},{"id":"162","name":"na ke lu lu "},{"id":"157","name":"bu zhi huo wu "},{"id":"156","name":"zhang liang "},{"id":"154","name":"hua mu lan "},{"id":"153","name":"lan ling wang "},{"id":"152","name":"wang zhao jun1 "},{"id":"150","name":"han xin "},{"id":"149","name":"liu bang "},{"id":"148","name":"jiang zi ya "},{"id":"146","name":"lu na "},{"id":"144","name":"cheng yao jin "},{"id":"142","name":"an qi la "},{"id":"141","name":"diao chan "},{"id":"140","name":"guan yu "},{"id":"139","name":"lao fu zi "},{"id":"136","name":"wu ze tian "},{"id":"135","name":"xiang yu "},{"id":"134","name":"da mo "},{"id":"133","name":"di ren jie "},{"id":"132","name":"ma ke bo luo "},{"id":"131","name":"li bai "},{"id":"130","name":"gong ben wu cang "},{"id":"129","name":"dian wei "},{"id":"128","name":"cao cao "},{"id":"127","name":"zhen ji "},{"id":"126","name":"xia hou dun "},{"id":"124","name":"zhou yu "},{"id":"123","name":"lü bu "},{"id":"121","name":"mi yue "},{"id":"120","name":"bai qi "},{"id":"119","name":"bian que "},{"id":"118","name":"sun bin "},{"id":"117","name":"zhong wu yan "},{"id":"116","name":"a ke "},{"id":"115","name":"gao jian li "},{"id":"114","name":"liu chan "},{"id":"113","name":"zhuang zhou "},{"id":"112","name":"lu ban qi hao "},{"id":"111","name":"sun shang xiang "},{"id":"110","name":"ying zheng "},{"id":"109","name":"da ji "},{"id":"108","name":"mo zi "},{"id":"107","name":"zhao yun "},{"id":"106","name":"xiao qiao "},{"id":"105","name":"lian po "}];
abb.forEach((item, index) => {
	
})
let index = 1;
for (let hero of abb) {
	// if (hero.name === '盾山') {
	// 	continue;
	// }
	index++;
    spiderImg({
        url: `https://pvp.qq.com/web201605/herodetail/${hero.id}.shtml`, // 英雄详情页
        // url: `https://pvp.qq.com/zlkdatasys/yuzhouzhan/herovoice/${hero.id}.json?t=${Date.now()}${index}`, // 英雄语音
        filePath: '../temp',
        handleResCallback: async (arr, res) => {
			// 英雄语音
			// if (!Array.isArray(res.data.dqpfyy_5403)) {
			// 	res.data.dqpfyy_5403 = [res.data.dqpfyy_5403];
			// }
			// for (let item of res.data.dqpfyy_5403) {
			// 	const tempPath = `../temp/${hero.name}/${item.pfmczt_7754}-台词`;
			// 	fs.mkdir(tempPath, { recursive: true }, err => {
			// 		if (!err) {
			// 			for (let item2 of item.yylbzt_9132) {
			// 				if (!item2.yywjzt_5304) {
			// 					console.log(hero.name, item.pfmczt_7754, item2.yywjzt_5304);
			// 					continue;
			// 				}
			// 				request('https:' + item2.yywjzt_5304).pipe(fs.createWriteStream(path.join(tempPath, `${item2.yywbzt_1517.replace(/\?/g, '？').replace('/', '').replace('\n', '').replace(':', "：").replace(/"/g, "")}.mp3`), {'enconding':'binary'}));
			// 			}
			// 		}
			// 	})
			// }
			
			// 英雄图像
			const html = iconv.decode(res.data, 'gbk');
            const $ = cheerio.load(html);
			const name = $('.cover-name').text();
			const skinNameArr = $('.pic-pf-list').attr('data-imgname').split('|').map(item => item.split('&')[0]);
			fs.mkdir('../temp1', { recursive: true }, err => {
				// for (let i=1;i<=skinNameArr.length; i++) {
					// request(`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.id}/${hero.id}-smallskin-${i}.jpg`).pipe(fs.createWriteStream(path.join('../temp/', `${name}-${skinNameArr[i-1]}-头像${i === 1 ? '-原皮' : ''}.jpg`), {'enconding':'binary'}));
					request(`https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${hero.id}/${hero.id}-bigskin-${1}.jpg`).pipe(fs.createWriteStream(path.join('../temp1', `${name}-${skinNameArr[0]}${true ? '-原皮' : ''}.jpg`), {'enconding':'binary'}));
				// }
			})
        },
    })
}

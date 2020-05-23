const { spawn } = require('child_process');

let data =  [];
let scraper = (psearch) => {
	return new Promise((resolve, reject) => {
		const childProcess =  spawn('python',['./pythonScraperModule/flipkartScraper.py',psearch]);

		childProcess.stdout.on('data', function(data) {
			resolve(data);
		});
		childProcess.stderr.on('data',(data)=>{
			reject(data);
		});
	});
};

let callWebhook =  async (app) => {
	return await app.post('/getScrapedData/:search',async (req,res)=>{
		await scraper(req.params.search).then((scrapedData)=>{
			data.push(scrapedData.toString());
			res !== undefined ? res.redirect('/postTwiResWebhook') :  null;
		})
			.catch((err) => {
				console.log('Error occured: ' +err);
			});
	});
};


module.exports.callWebhook = callWebhook;
module.exports.dataWebhook =  data;

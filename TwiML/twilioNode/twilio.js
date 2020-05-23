const MessagingResponse = require('twilio').twiml.MessagingResponse;
const stream = require('stream');
const readline = require('readline');
const fs = require('fs');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const parser = require('xml2json');
let data = null;

function hasArray (data) {
	return function(req,res,next) {
		req.body =  [...data];

		next();
	};
}

function convertValidJSON (req, res, next){
	if (/\/xml$/.test(req.headers['content-type'])) {
		req.body = parser.toJson(req.body.toString(), { object: true });
	}
	next();
}


let checkReadableStream = (req) => {
	return (req instanceof stream.Stream || req instanceof stream.Readable)
		&& (typeof(req._read) == 'function');
};


let filterPayload = (payloadStream = null,res) => {
	if( payloadStream  === null) {
		try {
			throw new Error('The data of product is not there!');
		} catch(e) {
			console.error(`${e.message} : ERROR: ${e.status}`);
		}
	}


	const rl = readline.createInterface({
		input: payloadStream
	});

	let count = 0;
	let wasRead = false;

	rl.on('line',(payloadChunks) => {
		if(wasRead == true ) {
			return undefined;
		}
		count++;
		sendMessgaestoDevice(payloadChunks);
		if(count == 10) {
			wasRead = true;
			rl.close();
		}
	});

	rl.on('close', () => {
		console.log('About to send response');
		res.send('Here are the top 10 results :');
	});
};


function sendMessgaestoDevice(chunks) {
	console.log(checkReadableStream(chunks));
	client.messages
		.create({
			body: `${chunks.slice()}` ,
			from: `whatsapp:${process.env.SANDBOX_NUMBER}`,
			to: `whatsapp:${process.env.PHONE_NO}`
		})
		.then(message => console.log(message.sid))
		.catch(err => console.log('[error]', err))
		.done();
}


module.exports = (app,data) => {
	let filterArray =  hasArray(data);

	app.use('/postTwiResWebhook',filterArray,convertValidJSON);

	app.route('/postTwiResWebhook')
		.post(filterArray,convertValidJSON,  (req,res) => {
			let payload = null;
			payload =  req.body.pop();

			fs.writeFileSync('payload.txt',payload,'utf-8');
			const createReadableStream =  fs.createReadStream('payload.txt');
			console.log(checkReadableStream(createReadableStream));
			res.set('Content-Type', 'text/plain');
			filterPayload(createReadableStream,res);


		});
};

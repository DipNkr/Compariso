const express =  require('express');
const bodyParser =  require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: () => true }));

require('dotenv').config();
require('./TwiML/routeHandlers/routes')(app);

require('./trigger').callWebhook(app);
let dataWebhook = require('./trigger').dataWebhook;

require('./TwiML/twilioNode/twilio')(app,dataWebhook);
require('./nodeScraperModule/amazonScraper')(app);


const PORT = process.env.PORT || 3002;

app.listen(PORT,()=>{
	console.log(`Running on ${PORT}`);
});

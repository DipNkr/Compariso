---


---

<h1 id="compariso">Compariso</h1>
<p><a href="https://app.codacy.com/app/GAUTAMRAJU15/Compariso?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GAUTAMRAJU15/Compariso&amp;utm_campaign=Badge_Grade_Dashboard"><img src="https://api.codacy.com/project/badge/Grade/b8ee52a16bd84730b40318a60747025d" alt="Codacy Badge"></a></p>
<p>Price Negotiator</p>
<blockquote>
<p>A bot for comparising price in whatsapp .</p>
</blockquote>
<p>A price comparator will do all your filtering and searches for you by just typing as if you are talking to a person on WhatsApp.  There are already many services doing other automation on WhatsApp for their customers to get most out of the technology. With every other person on WhatsApp it comes to a conclusion that engage your customer on WhatsApp and try to target/segment on WhatsApp.</p>
<p>Here is the workflow :</p>
<p><img src="https://lh3.googleusercontent.com/O2H_bKLf1uVRvE6crmrpTY6jhxEtvRa45GoYwPJuU7Enscoj3-NvjPKRhM8qL8BQh1kGsjyEKwP-cSMXU0N3mwNeSlFqZIC3F5zY35GhsJiweBn8SxY3AeZfDtP7FZVeO3SIYMl38HfRlRyf2VHqqh3KDe1GZH6wDKbSES_fnKlQhtuyPDc5aac-WiKxqSsGcmUslCmE2jILRrW6BFYvkHr5nyeIUPn57IwIWm8ZTnRt1tXjzIAqu894aEOzpj32eelSDxnL2gt52Qeua9GETvxitucLR3_MOfHykNZ2nAVyfSDT7lo-qmMbaAvbe-MpypzoJo9_eruOGrXCYgJ2hhT1K9T5GV0xsQVndGBO7DyWjzfqfY8bfNlHwZKqABKsA_5UDbG0djnwI9qJSt2NpCWzmxYJzHhucIC9PdR-c0h5WWQlpEDvTdVZprkahY4xtQJ0OM2e3T0vfuKO8BEEy2fDijLTjrUpGYQeL0UdcZYwOrRS9_cqiTVbD9DwxnV9Xjm8Bda6Dk-I6hY9lOrOBGeZ5eN9PZd2X0cD_YO4Gvmi5S84zgJrPix71l1TttciqQEEUKcYviuBN1guNLAacnbZPhM0a4pUOIorJLpNwbbWv7EmFfvtXJrv6A_J5QOUo11lkKvZ2WmmTxCbPmsEqreN=w1195-h256-no" alt="workflow"></p>
<h2 id="requirements">Requirements</h2>
<p>Need <strong><a href="http://Serveo.net">Serveo.net</a></strong> for development ship , for production ship one can deploy to hosting/Paas like <strong>Heroku</strong> .</p>
<p>Serveo is an SSH server just for remote port forwarding. When a user connects to Serveo, they get a public URL that anybody can use to connect to their localhost server.</p>
<p><strong>Basic Use:</strong></p>
<pre><code>ssh -R 80:localhost:3000 serveo.net
</code></pre>
<p>This sends a request to port 80 of serveo whenever request comes in <strong>PORT 3000</strong> of our node app</p>
<h2 id="twilio">Twilio</h2>
<p>Needs to have a twilio account , there u can create a sandbox and one  can get a Virtual Number which will be added to WhatsApp to send the request parameters in chat.</p>
<p>You need to setup a <em>Webhook</em> in Node server and paste that link in Twilio sandbox environment , at which the chat request queries for a product  will hit . <strong>WebHooks</strong> will POST a message to a URL when certain things happen.</p>
<p>After that app runs and gives you back data on the registered  mobile Number in twilio.</p>


# syntax-mail
simple mail sending with syntax-mail api

## installation
```sh
npm i syntax-mail # --save
```
## usage
```js
const SyntaxMail = require('syntax-mail');

// new SyntaxMail(username, password);
const api = new SyntaxMail('smtp@sntx.ml', 'smtp-api-sdk');

// to and body is required mail property
const mail = {
  // addressee or array of addressee  
  to: 'test@syntax-shell.me', // ['mail1@a.io', 'mail2@a.io', 'mail3@a.io'],
  body: 'syntax hello',
  // subject: '',
  // content_type: 'text/html',
  // as: '',
};

api
  .send(mail)
  .then(res => console.log(res));

// {"status":200,"message":"Sent."}
// or [{"status":200,"message":"Sent."}, {"status":200,"message":"Sent."}]
```

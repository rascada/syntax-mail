'use strict';

const api = 'https://syntax-shell.me/smtp-api';
const base64 = require('./base64');
const req = require('request').post;

class SyntaxMail {
  constructor(username, password) {
    this.username = base64(username);
    this.password = base64(password);
  }

  send(options, cb) {
    return new Promise((fulfill, rej) => {

      const form = Object.assign({
        username: this.username,
        password: this.password,
      }, options);

      req(api, { form }, (err, res, body) => {
        if (cb) cb(err, body);
        if (err) rej(err);

        fulfill(body);
      });

    });
  }
}

module.exports = SyntaxMail;

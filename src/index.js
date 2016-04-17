'use strict';

const api = 'https://syntax-shell.me/smtp-api';
const base64 = require('./base64');
const req = require('request').post;

class SyntaxMail {
  constructor(username, password) {
    this.username = base64(username);
    this.password = base64(password);
  }

  _send(form, cb) {
    return new Promise((fulfill, rej) => {
      req({
        form,
        url: api,
        headers: { 'User-Agent': 'syntax-mail-js:smtp' },
      }, (err, res, body) => {
        if (cb) cb(err, body);
        if (err) rej(err);

        fulfill(body);
      });
    });
  }

  createForm(mail) {
    return Object.assign({
      username: this.username,
      password: this.password,
    }, mail);
  }

  send(mail, cb) {
    const form = this.createForm(mail);

    if (mail.to instanceof Array) {
      const emails = [];

      mail.to.forEach(drawee => {
        form.to = drawee;
        emails.push(this._send(form));
      });

      return Promise.all(emails);
    }

    return this._send(form, cb);
  }
}

module.exports = SyntaxMail;

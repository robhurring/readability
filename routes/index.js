'use strict';

var request = require('request'),
  cheerio = require('cheerio');

exports.index = function(req, res) {
  res.render('index');
};

exports.fetch = function(req, res) {
  var url = req.query.url;

  if(!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  request(url, function(err, data) {
    if(!err) {
      var doc = cheerio.load(data.body),
        text;

      // remove cruft
      doc('script,link,img').remove();
      text = String(doc('body').text()).replace(/\s{2,}|\n\r/ig, ' ');

      if(text === '') {
        res.json(422, {
          url: url,
          text: '',
          error: 'Could not find content for this URL'
        });
      } else {
        res.json(200, {
          url: url,
          text: text.trim(),
          error: null
        });
      }
    } else {
      res.json(500, {
        url: url,
        text: '',
        error: err.toString()
      });
    }
  });
};

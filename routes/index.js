'use strict';

var request = require('request'),
  cheerio = require('cheerio'),
  textstatistics = require('text-statistics'),
  density = require('density'),
  writeGood = require('write-good');

exports.index = function(req, res) {
  res.render('index');
};

exports.fetch = function(req, res) {
  var url = req.query.url;
  var startTime = new Date().getTime();
  var requestOptions = {
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    }
  }

  if(!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  request(requestOptions, function(err, data) {
    var requestTime = new Date().getTime() - startTime;
    var payload = {
      url: url,
      responseTime: requestTime,
      error: null
    };

    if(!err) {
      var doc = cheerio.load(data.body);
      var densityOptions = {};

      // remove cruft
      doc('script,link,img,style').remove();

      var text = String(doc('body').text()).replace(/\s{2,}|\n\r/ig, ' ').trim();
      var title = doc('title').text().trim();
      var description = doc('meta[name=description]').attr('content');
      if (description === "") {
        description = "[none]";
      }

      var ts = textstatistics(text);
      var suggestions = writeGood(text);

      payload.meta = {
        title: title,
        text: text,
        description: description
      };

      payload.stats = {
        readingEase: ts.fleschKincaidReadingEase(),
        gunningFog: ts.gunningFogScore(),
        gradeLevel: ts.fleschKincaidGradeLevel()
      }

      var kwDensity = density(text).setOptions(densityOptions).getDensity();

      payload.metrics = {
        keywordDensity: kwDensity.slice(0, 10),
        titleLength: title.length,
        suggestions: suggestions
      }

      if(payload.text === '') {
        payload.error = 'Could not find content for this URL';
        res.json(422, payload);
      } else {
        res.json(200, payload);
      }
    } else {
      payload.error = err.toString();
      res.json(500, payload);
    }
  });
};

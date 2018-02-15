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

  if(!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  request(url, function(err, data) {
    var payload = {
      url: url,
      title: null,
      text: null,
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

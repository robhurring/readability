var request = require('request')
  , cheerio = require('cheerio');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.fetch = function(req, res){
  request(req.query.url, function(err, data){
    if(!err){
      var doc = cheerio.load(data.body)
        , text;

      // remove cruft
      doc('body script').remove();
      text = String(doc('body').text()).replace(/\s{2,}|\n\r/ig, ' ');

      res.json(200, {text: text.trim(), error: null});
    }else{
      res.json(500, {text: '', error: err});
    }
  });
}
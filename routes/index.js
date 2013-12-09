var request = require('request')
  , cheerio = require('cheerio')
  , URL = require('url');

exports.index = function(req, res){
  res.render('index');
};

exports.fetch = function(req, res){
  var url = req.query.url;

  if(!/^https?:\/\//i.test(url)){
    url = "http://" + url;
  }

  request(url, function(err, data){
    if(!err){
      var doc = cheerio.load(data.body)
        , text;

      // remove cruft
      doc('script,link,img').remove();
      text = String(doc('body').text()).replace(/\s{2,}|\n\r/ig, ' ');

      res.json(200, {text: text.trim(), error: null});
    }else{
      console.log("error:", err);
      res.json(500, {text: '', error: err.toString()});
    }
  });
}
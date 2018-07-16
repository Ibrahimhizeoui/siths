var express = require('express');
var router = express.Router();
const request = require('request');
const callbackUrl = 'http://localhost:3000/test';
const ApiHostname = 'https://client-test.grandid.com';
const apiKey='73f9b0dac47004556036f77d1b2c743e';
const authenticateServiceKey='cb8bb8e580e7d9e7d586fe64fd3980b9';
//const callbackUrl = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  const url = `${ApiHostname}/json1.1/FederatedLogin?apiKey=${apiKey}e&authenticateServiceKey=${authenticateServiceKey}&callbackUrl=${callbackUrl}`
  request(url, (err, result, body) => {
    if (err) res.render('err', { error: err });
    else {
    	let r = JSON.parse(body);
      console.log('Cookies: ', req.cookies)
      res.redirect(r.redirectUrl);
    }
  });
  //res.render('index', { title: 'Express' });
});

router.get('/category', function(req, res) {
  var string = encodeURIComponent('something that would break');
  res.redirect('/?valid=' + string);
});
router.get('/test', function(req, res, next) {
  res.render('test', { req: req });
});
module.exports = router;

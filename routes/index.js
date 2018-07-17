var express = require('express');
var router = express.Router();
const request = require('request');
require('dotenv').config()
const callbackUrl = process.env.callbackUrl;
const ApiHostname = process.env.ApiHostname;
const apiKey= process.env.apiKey;
const authenticateServiceKey= process.env.authenticateServiceKey;
//const callbackUrl = "";
/* GET home page. */
router.get('/', function(req, res, next) {
  const url = `${ApiHostname}/json1.1/FederatedLogin?apiKey=${apiKey}e&authenticateServiceKey=${authenticateServiceKey}&callbackUrl=${callbackUrl}`
  request(url, (err, result, body) => {
    if (err) res.render('err', { error: err });
    else {
    	let r = JSON.parse(body);
      res.redirect(r.redirectUrl);
    }
  });
  //res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
  const grandidsession = req.query.grandidsession
  const url = `${ApiHostname}/json1.1/GetSession?apiKey=${apiKey}e&authenticateServiceKey=${authenticateServiceKey}&sessionId=${grandidsession}`
  request(url, (err, result, body) => {
    if (err) res.render('err', { error: err });
    else {
      let r = JSON.parse(body);
      res.render('test', { provier: r });
    }
  });

});

router.get('/logout', function(req, res, next) { 
  const url = `${ApiHostname}/json1.1/Logout`;
  request(url, (err, result, body) => {
    if (err) res.render('err', { error: err });
    else {
      let r = JSON.parse(body);
      console.log(r);
    }
  });
});
module.exports = router;

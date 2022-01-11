var express = require('express');
var router = express.Router();
const axios = require('axios')
// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,INR
/* GET home page. */
router.get('/top/mktcapfull', function (req, res, next) {
  const { limit, tsym, api_key } = req.query
  axios.get(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    })

});


router.get('/price', function (req, res, next) {
  const { fsym, tsyms, api_key } = req.query
  axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=${tsyms}`)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    })
});


router.get('/v2/histominute', function (req, res, next) {
  const { fsym, tsyms, api_key, limit } = req.query
  axios.get(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${fsym}&tsym=${tsyms}&limit=${limit}`)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    })

});
module.exports = router;

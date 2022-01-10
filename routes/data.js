var express = require('express');
var router = express.Router();
const axios = require('axios')
// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,INR
/* GET home page. */
router.get('/top/mktcapfull', function (req, res, next) {
  const { limit, tsym,api_key } = req.query
  axios.get(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD`)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    })

});

module.exports = router;

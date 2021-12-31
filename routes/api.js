var express = require('express');
var router = express.Router();
const axios = require('axios')
// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,INR
/* GET home page. */
router.get('/live', function (req, res, next) {
  const { access_key, currencies, source, format } = req.query
  axios.get(`https://api.exchangerate-api.com/v4/latest/${source}`)
    .then(function (response) {
      const price = response.data.rates;
      var output = Object.keys(price).map(function (i) {
        return [{ [source + i]: price[i] }];
      });
      function arr2obj(arr) {
        return arr.map((acc) => {
          return acc[0];
        },
          {}
        );
      }
      const priceOb = arr2obj(output)
      const livePrice = Object.assign({}, ...priceOb);
      const result = {
        "success": true,
        "terms": "https:\/\/currencylayer.com\/terms",
        "privacy": "https:\/\/currencylayer.com\/privacy",
        "timestamp": response.data.time_last_updated,
        "source": response.data.base,
        "quotes": livePrice
      }
      res.json(result);
    })
    .catch(function (error) {
      res.json({
        "success": false,
        "error": {
          "code": 106,
          "info": "You have exceeded the maximum rate limitation allowed on your subscription plan."
        }
      });
    })
});

module.exports = router;

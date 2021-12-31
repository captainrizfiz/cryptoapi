var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/live', function (req, res, next) {
  const { access_key, currencies, source, format } = req.query
  axios.get(`https://api.exchangerate-api.com/v4/latest/${source}`)
    .then(function (response) {
      const mycurrencies = currencies.split(",");
      const price = response.data.rates;
      const filterPrice = mycurrencies.map(key=>{
        return {[source+key]:price[key]}
      })
      const livePrice = filterPrice.reduce(function(result, item) {
        var key = Object.keys(item)[0]; //first property: a, b, c
        result[key] = item[key];
        return result;
      }, {});
      const result = {
        "success": true,
        "terms": "https:\/\/currencylayer.com\/terms",
        "privacy": "https:\/\/currencylayer.com\/privacy",
        "timestamp": response.data.time_last_updated,
        "source": response.data.base,
        "quotes": livePrice
      }
      res.status(201).json(result);
    })
    .catch(function (error) {
      res.json({
        "success":false,
        "error":{
          "code":106,
          "info":"Your subscription plan  expire."
        }
      });
    })
});

module.exports = router;

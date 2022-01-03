var express = require('express');
var router = express.Router();
const axios = require('axios')
// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,INR
/* GET home page. */
router.get('/live', function (req, res, next) {
  const { currencies, source } = req.query
  axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies}&tsyms=${source}`)
    .then(function (response) {
      var data=[]
      for (const [key, value] of Object.entries(response.data)) {
       data = [...data,{[key]:{quote:{[source.toLocaleUpperCase()]:{price:value.USD}},symbol:key}}];
      }

      const liveCrypto = Object.assign({}, ...data);

      res.json({
        data:liveCrypto
      });
    })
    .catch(function (error) {
      res.json({
        "status": {
          "timestamp": "2021-12-31T14:28:55.193Z",
          "error_code": 1002,
          "error_message": "API key missing.",
          "elapsed": 0,
          "credit_count": 0
        }
      });
    })

});

module.exports = router;

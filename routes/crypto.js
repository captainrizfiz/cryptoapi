var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/live', function (req, res, next) {
  const {currencies, source } = req.query
  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${source}&ids=${currencies}`)
  .then(function (response) {
    const filterCrypto = response.data.map(val=>{
      return {
        [val.symbol.toLocaleUpperCase()]:{
          id:val.id,
          symbol:val.symbol.toLocaleUpperCase(),
          name:val.name,
          slug:val.name,
          quote: {
            [val.symbol.toLocaleUpperCase()]: {
                price: val.current_price,
            }
        }
        }
      }
    })
    res.json({
      data:filterCrypto
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

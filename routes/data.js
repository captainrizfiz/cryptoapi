var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/top/mktcapfull', function (req, res, next) {
    const { limit, tsym, api_key } = req.query
    axios.get(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${limit}&tsym=${tsym}`)
        .then((response)=>{
            res.json(response);
        })
        .catch((error)=>{
            res.json({
                "Response": "Error",
                "Message": "tsym param is not valid. Nothing trades in USA",
                "HasWarning": false,
                "Type": 2,
                "RateLimit": {},
                "Data": {},
                "ParamWithError": "tsym"
            });
        })

});

module.exports = router;

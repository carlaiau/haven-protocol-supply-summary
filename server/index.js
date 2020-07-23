require('dotenv').config()
const axios = require("axios")
const express = require('express')
const app = express()
const port = 3000

app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async (req, res) => {
    const { data } = await axios.get(process.env.HAVEN_NETWORK_API)

    const { coingecko, db_lastblock, db_lastblock24 } = data

    const gecko = {
        current_price: coingecko.market_data.current_price,
        high_24: coingecko.market_data.high_24h,
        low_24: coingecko.market_data.low_24h,
        tickers: coingecko.tickers
    }

    const last_block = {
        usd_spot: db_lastblock.pricing_spot_record.xUSD,
        usd_record: db_lastblock.pricing_record.xUSD,
        xhv_supply: db_lastblock.supply.XHV,
        usd_supply: db_lastblock.supply.xUSD,
        height: db_lastblock.height,
        deviation: db_lastblock.spot_ma_deviation.xUSD
    }
    const yesterday_block = {
        usd_spot: db_lastblock24.pricing_spot_record.xUSD,
        usd_record: db_lastblock24.pricing_record.xUSD,
        xhv_supply: db_lastblock24.supply.XHV,
        usd_supply: db_lastblock24.supply.xUSD,
        height: db_lastblock24.height,
        deviation: db_lastblock24.spot_ma_deviation.xUSD
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ gecko, last_block, yesterday_block }))
})


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

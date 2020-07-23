const axios = require("axios")
const cheerio = require("cheerio")
const express = require('express')
const app = express()
const port = 3000


async function fetchHTML(url) {
    const { data } = await axios.get(url)
    return cheerio.load(data)
}

function numberFromRow(rowEl) {
    return rowEl.text().trim().replace(/[^\d.-]/g, '')
}

app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.havenprotocol.net");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', async (req, res) => {
    const $ = await fetchHTML("https://explorer.havenprotocol.org/supply")

    let supply = {}

    $('table tr').each(function (i) {
        if (i == 1)
            supply.xhv = numberFromRow($(this))
        if (i == 2)
            supply.usd = numberFromRow($(this))
    })

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(supply))
})


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

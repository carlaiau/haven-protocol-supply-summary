import React, { useEffect, useState } from "react"
import Nav from '../components/nav'
import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from '@emotion/styled'

const IndexPage = () => {
  const [supply, setSupply] = useState(false)
  const [price, setPrice] = useState(false)
  const [totals, setTotals] = useState(false)
  const [latestUpdate, setUpdate] = useState()

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getData = () => {
    fetch(process.env.GATSBY_API_URL).then(async res => {
      const { gecko, last_block, yesterday_block } = await res.json()



      setSupply({
        xhv: last_block.xhv_supply,
        usd: last_block.usd_supply,
        last_block,
        yesterday_block
      })
      setPrice({
        current: {
          usd: gecko.current_price.usd,
          btc: gecko.current_price.btc
        },
        low: {
          usd: gecko.low_24.usd,
          btc: gecko.low_24.btc
        },
        high: {
          usd: gecko.high_24.usd,
          btc: gecko.high_24.btc
        },
        tickers: gecko.tickers
      })
      var m = new Date();
      setUpdate(m.toLocaleTimeString());
    })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData()
    const interval = setInterval(() => { getData() }, 30000);
    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    if (supply && price) {
      setTotals({
        usd: parseFloat(supply.xhv) * price.current.usd + parseFloat(supply.usd),
        xhv: parseFloat(supply.usd) / price.current.usd + parseFloat(supply.xhv),
      })
    }
  }, [supply, price])

  return (

    supply && price && totals && (
      <Layout>
        <SEO title="Home" />
        <Nav />


        <StyledHome>
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="is-size-2">
                  XHV Market Pricing
                </h1>
                <p className="is-size-6">Current and daily range</p>
              </div>
            </div>

            <table className="table big">
              <tbody>
                <tr className="is-size-1">
                  <td>
                    <strong>
                      {price.current.usd}
                    </strong> USD
                  </td>
                  <td>
                    <strong>
                      {price.current.btc.toFixed(8)}
                    </strong> BTC
                </td>
                </tr>
                <tr className="is-size-4">
                  <td>
                    <strong>{price.low.usd}</strong> - <strong>{price.high.usd}</strong> USD
                  </td>
                  <td>
                    <strong>{price.low.btc.toFixed(8)}</strong> - <strong>{price.high.btc.toFixed(8)}</strong> BTC
                  </td>
                </tr>



              </tbody>
            </table>
            <div className="columns">
              <div className="column">
                <h2 className="is-size-2">
                  Current Supply
              </h2>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                </tr>
                <tr>
                  <th style={{ opacity: 0 }}>XHV/USD</th>
                  <th>Worth in XHV</th>
                  <th>Worth in USD</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    Held in XHV
                  </th>
                  <td>
                    {parseFloat(supply.xhv).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </td>
                  <td>
                    {formatter.format(parseFloat(supply.xhv) * price.current.usd)}
                  </td>
                  <td>
                    {((parseFloat(supply.xhv) * price.current.usd) / totals.usd * 100).toFixed(2)}%
                </td>
                </tr>
                <tr>
                  <th>
                    Held in xUSD
                  </th>
                  <td>
                    {(parseFloat(supply.usd) / price.current.usd).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </td>
                  <td>
                    {formatter.format(supply.usd)}
                  </td>
                  <td>
                    {(parseFloat(supply.usd) / totals.usd * 100).toFixed(2)}%
                </td>
                </tr>
                <tr>
                  <th>
                    Total
                  </th>
                  <td>
                    {totals.xhv.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                  </td>
                  <td>
                    {formatter.format(totals.usd)}
                  </td>
                </tr>

              </tbody>

            </table>


            <div className="columns">
              <div className="column">
                <h2 className="is-size-2">
                  Conversion Pricing
                </h2>
              </div>
            </div>
            <table className="table conversion">
              <thead>
                <tr>
                  <th>Blocks <span style={{ float: 'right' }}>(height)</span></th>
                  <th>Spot</th>
                  <th>MA</th>
                  <th>MA Deviation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Latest <span style={{ float: 'right' }}>({supply.last_block.height})</span></th>
                  <td>{supply.last_block.usd_spot.toFixed(4)}</td>
                  <td>{supply.last_block.usd_record.toFixed(4)}</td>
                  <td>{supply.last_block.deviation.toFixed(4)}</td>
                </tr>
                <tr>
                  <th>24H Ago <span style={{ float: 'right', paddingLeft: '10px' }}> ({supply.yesterday_block.height})</span></th>
                  <td>{supply.yesterday_block.usd_spot.toFixed(4)}</td>
                  <td>{supply.yesterday_block.usd_record.toFixed(4)}</td>
                  <td>{supply.yesterday_block.deviation.toFixed(4)}</td>
                </tr>
              </tbody>
            </table>


            <div className="columns">
              <div className="column">
                <h2 className="is-size-2">
                  Purchase Haven
                </h2>
              </div>
            </div>

            <table className="table markets">
              <thead>
                <tr>
                  <th></th>
                  <th>Pair</th>
                  <th>Volume</th>
                  <th>Price</th>
                  <th>Spread</th>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {
                  price.tickers
                    .sort((m1, m2) => m1.volume > m2.volume ? -1 : 1)
                    .map((m, i) => {
                      const url = m.market.name == 'TOKOK' && m.target == 'BTC' ?
                        'https://www.tokok.com/market?symbol=XHV_BTC' :
                        m.market.name == 'Bitalong' ? 'https://www.bitalong.com/#/trade?name=xhv_btc' :
                          m.trade_url
                      return (
                        <tr key={'market-' + i}>
                          <th>
                            <a href={url} target="_blank" rel="noreferrer">
                              {m.market.name}
                            </a>
                          </th>
                          <td>{m.target}</td>
                          <td>{formatter.format(m.converted_volume.usd)}</td>
                          <td>{formatter.format(m.converted_last.usd)}</td>
                          <td>{m.bid_ask_spread_percentage.toFixed(2)}%</td>
                          <td><a href={url}
                            target="_blank" rel="noreferrer">
                            Buy
                          </a>
                          </td>
                        </tr>

                      )
                    }
                    )
                }
              </tbody>
            </table>
            <div className="columns" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="column is-half">
                <p className="is-size-6" style={{ marginTop: '30px' }}>
                  Data from Haven's <a href="https://explorer.havenprotocol.org/supply">block explorer</a> and <a href="https://www.coingecko.com/en/coins/haven">CoinGecko</a>
                </p>
                <p className="is-size-6">Page auto refreshes. Last updated at {latestUpdate}</p>
                <p className="is-size-1" style={{ marginTop: '20px' }}><span role="img" aria-label="Rocket to moon">🚀</span></p>
              </div>
            </div>
          </div>
        </StyledHome>

      </Layout >
    )
  )
}

const StyledHome = styled('div')`
background-image: url('https://havenprotocol.org/wp-content/themes/havenprotocol/css/imgs/map.png');
background-size: cover;
background-repeat: no-repeat;
background-position: 50% 50%;
min-height: 100vh;
padding-top: 120px;
    @media screen and (min-width: 421px){
            padding-top: 150px;
    }
text-align: center;

table{
            background: none;
  color: #fff;
  margin: auto;
  &.table{
    margin-bottom: 50px;
  }
  td{
            text-align: right;
    border: none;
  }
  th{
            color: #7289da;
    border: none;
    text-align: left !important;
  }
  thead{
            th{
      &:nth-of-type(2),
      &:nth-of-type(3),
      &:nth-of-type(4){
            border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background: #222;
      }
      &:nth-of-type(2){
            border-left: 1px solid #fff;
      }
      &:nth-of-type(4){
            border-right: 1px solid #fff;
      }
    }
  }
  tbody{
            th{
            border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      background: #222;
    }

    tr{
      &:nth-of-type(1) {
            th{
            border-top: 1px solid #fff;
        }
      }
      &:nth-of-type(3) {
            th{
            border-bottom: 1px solid #fff;
        }
      }
    }
  }
  &.conversion{
    tr{
      &:nth-of-type(2) {
        th{
          border-bottom: 1px solid #fff;
        }
      }
    }
  }
  &.markets{
    thead{
      th{
        &:nth-of-type(4){
          border-right: none;
        }
        &:nth-of-type(5){
          border: 1px solid #fff;
          border-left: none;
          background: #222;
        }
      }
    }
    tbody{
      tr{
        &:nth-of-type(3){
          th{
            border-bottom: none;
          }
        }
        &:last-of-type{
          th{
            border-bottom: 1px solid #fff;
          }
        }
      }
    }
  }
  &.big{
    strong{
      color: #7289da;
    }
    @media screen and (max-width: 420px){
            font-size: 1.5em !important;
    }
    th, td{
      text-align: center !important;
    }
    .is-size-1{
      @media screen and (max-width: 420px){
        font-size: 2rem !important;
      }
      td{
        padding-bottom: 0;
        padding-top: 0;
      }
    }
    .is-size-4{
      @media screen and (max-width: 420px){
        font-size: 1rem !important;
      }
    }
  }
}
  .columns{
    @media screen and (max-width: 420px){
            padding-left: 10px;
      padding-right: 10px;
    }
  }
}
`
export default IndexPage

import React, { useEffect, useState } from "react"
import Nav from '../components/nav'
import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from '@emotion/styled'

const IndexPage = () => {
  const [supply, setSupply] = useState(false)
  const [price, setPrice] = useState(false)
  const [totals, setTotals] = useState(false)

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const getData = () => {
    Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd%2Cbtc'),
      fetch('http://ec2-13-211-215-195.ap-southeast-2.compute.amazonaws.com:8080/')
    ]).then(async ([gecko, ec2]) => {
      const a = await gecko.json();
      const b = await ec2.json();
      setPrice(a)
      setSupply(b)


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
        usd: parseFloat(supply.xhv) * price.haven.usd + parseFloat(supply.usd),
        xhv: parseFloat(supply.usd) / price.haven.usd + parseFloat(supply.xhv),
      })
    }
  }, [supply, price])



  return (
    supply && price && totals && (
      <Layout>
        <SEO title="Home" />
        <Nav />


        <StyledHome className="container">
          <div className="columns">
            <div className="column">
              <h1 className="is-size-2">
                XHV Unit Pricing
              </h1>
            </div>
          </div>

          <table className="table big is-size-1">
            <tbody>
              <tr>
                <td>
                  <strong>
                    {price.haven.usd}
                  </strong> USD
                </td>
                <td>
                  <strong>
                    {price.haven.btc}
                  </strong> BTC
                </td>
              </tr>
            </tbody>
          </table>
          <div className="columns">
            <div className="column">
              <h2 className="is-size-2">
                Current Ecosystem
              </h2>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
              </tr>
              <tr>
                <th></th>
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
                  {formatter.format(parseFloat(supply.xhv) * price.haven.usd)}
                </td>
                <td>
                  {((parseFloat(supply.xhv) * price.haven.usd) / totals.usd * 100).toFixed(2)}%
                </td>
              </tr>
              <tr>
                <th>
                  Held in xUSD
                  </th>
                <td>
                  {(parseFloat(supply.usd) / price.haven.usd).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
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
          <div className="columns" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="column is-half">
              <p className="is-size-6" style={{ marginTop: '30px' }}>
                Data is pulled from Haven's <a href="https://explorer.havenprotocol.org/supply">block explorer</a> and <a href="https://www.coingecko.com/en/coins/haven">CoinGecko</a>.
              </p>
              <p className="is-size-6">This page automatically fetches new data every 30 seconds.</p>

              <p className="is-size-6">This was not created by the core XHV team and is a work in progress. Open to collaborations and feedback.</p>
              <p className="is-size-1" style={{ marginTop: '20px' }}>🚀</p>
            </div>
          </div>

        </StyledHome>

      </Layout >
    )
  )
}

const StyledHome = styled('div')`
background-image: url('https://havenprotocol.org/wp-content/themes/havenprotocol/css/imgs/map.png');

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
      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4){
            border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background: #222;
      }
      &:nth-child(2){
            border-left: 1px solid #fff;
      }
      &:nth-child(4){
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
      &:nth-child(1) {
          th{
          border-top: 1px solid #fff;
        }
      }
      &:nth-child(3) {
            th{
            border-bottom: 1px solid #fff;
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

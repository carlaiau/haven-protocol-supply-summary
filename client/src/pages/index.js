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

  useEffect(() => {

    Promise.all([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd%2Cbtc'),
      fetch('https://backend.xusd.live:8080/')
    ]).then(async ([gecko, ec2]) => {
      const a = await gecko.json();
      const b = await ec2.json();
      setPrice(a)
      setSupply(b)


    })
      .catch((err) => {
        console.log(err);
      });
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


          <table className="table is-bordered">
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


        </StyledHome>

      </Layout >
    )
  )
}

const StyledHome = styled('div')`
text-align: center;
img{
  margin: auto;
  max-width: 300px;
  width: 80%
}

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
}
`
export default IndexPage

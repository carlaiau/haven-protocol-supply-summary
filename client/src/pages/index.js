import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import black from '../images/background-white.svg'
import white from '../images/background-black.svg'
const IndexPage = () => {

  const [price, setPrice] = useState({})

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=haven&vs_currencies=usd%2Cbtc')
      .then(response => response.json())
      .then(d => setPrice(d))
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">
        <img src={white} />
        <pre>
          {JSON.stringify(price, null, 2)}
        </pre>

      </div>

    </Layout>
  )
}

export default IndexPage

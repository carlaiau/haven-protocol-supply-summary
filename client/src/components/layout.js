/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"


import './style.scss';
import styled from '@emotion/styled'

const Layout = ({ children }) => (
  <StyledLayout>
    <div>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p className="is-size-6">
            XHV Supply data from <a href='https://explorer.havenprotocol.org/supply'>Explorer</a> | Pricing data by <a href="https://www.coingecko.com/en/coins/haven">CoinGecko</a>
          </p>
        </div>

      </footer>
    </div>
  </StyledLayout>
)

const StyledLayout = styled('div')`
  background: #36393f;
  color: #fff;

  footer{
    margin-top: 100px;
    color: #fff;
    background: #26282B;;
    a{
      color: #fff;
      font-weight: 700;
    }
  }

`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

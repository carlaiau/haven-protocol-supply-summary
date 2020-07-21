/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import styled from '@emotion/styled'
import './style.scss';

const Layout = ({ children }) => (
  <StyledLayout>
    <div>
      <main>{children}</main>
      <footer className="footer">
        <div className="container">
          <p className="is-size-6">
            <a href='https://explorer.havenprotocol.org/supply'>XHV Supply data</a> | Pricing data by <a href="https://www.coingecko.com/en/coins/haven">CoinGecko</a>
          </p>

        </div>

      </footer>
    </div>
  </StyledLayout>
)

const StyledLayout = styled('div')`
  background: #222;
  color: #fff;
  footer{
    p
    color: #fff;
    background: #000;
    a{
      color: #fff;
      font-weight: 500;
    }
  }

`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

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

    </div>
  </StyledLayout>
)

const StyledLayout = styled('div')`
  background: #36393f;
  color: #fff;
  main{
    padding-bottom: 100px;
  }
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

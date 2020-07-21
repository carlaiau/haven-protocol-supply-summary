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
  background-color: #26282c;
  color: #fff;
`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

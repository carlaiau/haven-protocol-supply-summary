import React from 'react'
import white from '../images/background-black.svg'
import styled from '@emotion/styled'
import github from '../images/github.svg'
import twitter from '../images/twitter.svg'
export default () => (
    <StyledNav className="navbar is-dark">
        <div className="container">
            <div className="navbar-menu">
                <div class="navbar-brand">
                    <a className="navbar-item" href="https://havenprotocol.org/">
                        <img src={white} />
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://xusd.live" target="_blank" href="https://twitter.com/intent/tweet?text=Haven Protocol Ecosystem Summary&amp;hashtags=XHV,xUSD&amp;url=https://xusd.live&amp;via=carlaiau">
                                    <span className="icon">
                                        <img src={twitter} />
                                    </span>
                                    <span>
                                        Tweet
                        </span>
                                </a>
                            </p>
                            <p className="control">
                                <a className="bd-tw-button button" href="https://github.com/carlaiau/xAsset-Supply">
                                    <span className="icon">
                                        <img src={github} />
                                    </span>
                                    <span>Download</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </StyledNav>
)

const StyledNav = styled('nav')`
    @media screen and (max-width: 768px){
        .navbar-menu{
            display: flex;
            align-items: center;
            display: inline-block;
            background: none;
            width: 100%;
            
        }
        .navbar-brand{
            float: left;
        }
        .navbar-end{
            float: right;
        }
        margin-bottom: 20px;
    }
    
    @media screen and (min-width: 421px){
        margin-bottom: 100px;
    }
    padding: 5px 0;
    &.is-dark{
                background: #26282B;
    }
    .navbar-brand img{
        max-height: initial;
        max-width: 150px;
    }
`
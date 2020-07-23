import React from 'react'
import square from '../images/square.svg'
import styled from '@emotion/styled'
import github from '../images/github.svg'
import twitter from '../images/twitter.svg'
export default () => (
    <StyledNav className="navbar is-dark is-fixed-top">
        <div className="container">
            <div className="navbar-menu">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://havenprotocol.org/">
                        <img src={square} />
                        <h1>HAVEN</h1>
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <a className="button" data-social-network="Twitter" data-social-action="tweet" data-social-target="https://www.havenprotocol.net" target="_blank" rel="noreferrer" href="https://twitter.com/intent/tweet?text=Haven Protocol Supply https://www.havenprotocol.net $XHV $xUSD&amp;hashtags=privacy,ihaveabank,DeFi&amp;via=HavenXHV">
                                    <span className="icon">
                                        <img src={twitter} alt="Tweet" />
                                    </span>
                                    <span>
                                        Tweet
                        </span>
                                </a>
                            </p>
                            <p className="control">
                                <a className="button" href="https://github.com/carlaiau/haven-protocol-supply-summary" target="_blank" rel="noreferrer">
                                    <span className="icon">
                                        <img src={github} alt="Visit on Github" />
                                    </span>
                                    <span>Contribute</span>
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
    @media screen and (max-width: 960px){
        .navbar-menu{
            display: flex;
            align-items: center;
            background: none;
            width: 100%;
            
        }
        .navbar-brand{
            float: left;
            
        }
        .navbar-end{
            float: right;
        }
    }
    
    
    padding: 5px 0;
    &.is-dark{
                background: #222;
    }
    .navbar-brand{
        h1{
                font-size: 22px;
                font-family: Inter,sans-serif;
                margin: 0;
                color: #fff;
                text-transform: uppercase;
                font-weight: 700;
            }
        img{
            max-height: initial;
            max-width: 50px;
        }
    }
`
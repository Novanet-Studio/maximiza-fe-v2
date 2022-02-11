import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Logo from "../assets/images/logo-maximiza.svg"
import "./header.scss"

const Header = () => (
  <header className="header">
    <div className="header__logo-interno">
      <AniLink cover direction="right" duration={0.55} bg="#006648" to="/">
        <img className="header__imagen" src={Logo} alt="logo" />
      </AniLink>
    </div>
  </header>
)

export default Header

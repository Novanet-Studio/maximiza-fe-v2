import React, { useState } from "react"
import PropTypes from "prop-types"
import Header from "../components/header"
import Navigation from "../components/navigation"
import Footer from "../components/footer"
import "./layout.scss"

const Layout = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false)

  const toggleMenu = () => {
    const nav = document.getElementById("myNav")
    const main = document.querySelector("main")

    if (!isToggled) {
      nav.style.width = "50%"
      main.style.opacity = 0.3
      setIsToggled(true)
    } else {
      nav.style.width = "0"
      main.style.opacity = 1
      setIsToggled(false)
    }
  }

  return (
    <div className="contenedor">
      <button className="mobileMenu" onClick={toggleMenu}>
        ☰
      </button>
      <Header />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

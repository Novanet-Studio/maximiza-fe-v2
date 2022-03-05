import React from "react"
import LinkNav from "./linkNav"

const navigation = () => (
  <nav id="myNav" className="nav nav--overlay">
    <div className="nav__contenido">
      <div className="nav__grupo">
        <p className="nav__bala">•</p>
        <p className="nav__texto">Nosotros</p>
        <div className="nav__dropdown">
          <LinkNav estilo="nav__link" text="Empresa" to="/empresa" />
          <LinkNav estilo="nav__link" text="Servicios" to="/servicios" direction="left" />
          <LinkNav estilo="nav__link" text="Directiva" to="/directiva" />
          <LinkNav estilo="nav__link" text="Contacto" to="/contacto" />
        </div>
      </div>
      <div className="nav__grupo">
        <p className="nav__bala">•</p>
        <p className="nav__texto">Impacto ESG</p>
        <div className="nav__dropdown">
          <LinkNav estilo="nav__link" text="Private equity" to="/capital" />
          <LinkNav estilo="nav__link" text="Educación" to="/educacion" direction="left" />
          <LinkNav estilo="nav__link" text="Responsabilidad" to="/responsabilidad" />
        </div>
      </div>
      <div className="nav__grupo">
        <p className="nav__bala">•</p>
        <p className="nav__texto">Comunidad</p>
        <div className="nav__dropdown">
          <LinkNav estilo="nav__link" text="Medios" to="/medios" />
          <LinkNav estilo="nav__link" text="Blog" to="/blog" direction="left" />
          <LinkNav estilo="nav__link" text="Cumplimiento" to="/cumplimiento" />
        </div>
      </div>
    </div>
  </nav>
)

export default navigation

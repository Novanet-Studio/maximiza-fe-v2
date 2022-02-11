import React from "react"
import Layout from "../layout/layout"
import LinkNav from "../components/linkNav";
import Seo from "../components/seo"
import Perdido from "../assets/images/max-404-sec1.jpg"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <section className="principal">
      <div className="columna columna--izq">
        <img className="principal__imagen" src={Perdido} alt="404" />
      </div>

      <div className="columna columna--der">
        <h1 className="principal__titulo">Página no encontrada</h1>
        <p className="principal__texto principal__texto--corto">
          La página que estás intentando ver, no existe o ha sido cambiada de
          lugar. Usa el menú de navegación para volver al sitio o haz click en
          el botón de abajo para volver al inicio.
        </p>
        <LinkNav
            estilo="principal__boton"
            text="Ir al inicio"
            to="/"
          />
      </div>
    </section>

    <section className="perdido"></section>
  </Layout>
)

export default NotFoundPage

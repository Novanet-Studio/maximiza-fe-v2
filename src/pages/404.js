import React from "react";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import { StaticImage } from "gatsby-plugin-image";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <section className="principal">
      <div className="columna columna--izq">
        <StaticImage
          src="../assets/images/max-404-sec1.jpg"
          alt="Persona buscando en pila de pila de papeles"
        />
      </div>

      <div className="columna columna--der">
        <h1 className="principal__titulo">Página no encontrada</h1>
        <p className="principal__texto principal__texto--corto">
          La página que estás intentando ver, no existe o ha sido cambiada de
          lugar. Usa el menú de navegación para volver al sitio o haz click en
          el botón de abajo para volver al inicio.
        </p>
        <button
          className="principal__boton"
          onClick={() => (document.location.href = "/")}
        >
          Ir al inicio
        </button>
      </div>
    </section>

    <section className="perdido"></section>
  </Layout>
);

export default NotFoundPage;

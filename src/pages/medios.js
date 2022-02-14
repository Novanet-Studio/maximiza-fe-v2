import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Cta from "../components/ctaInformacion";
import "./medios.scss";

const Medios = ({ data }) => (
  <Layout>
    <Seo
      title={data.strapiMedios.seo.titulo}
      description={data.strapiMedios.descripcion}
      image={data.strapiMedios.seo.imagen}
    />
    <section className="principal">
      <div className="columna columna--izq">
        <GatsbyImage
          className="principal__imagen"
          image={getImage(data.strapiMedios.principal.imagen.localFile)}
          alt={data.strapiMedios.principal.seo_imagen.texto_alternativo}
          title={data.strapiMedios.principal.seo_imagen.titulo}
        />
      </div>
      <div className="columna columna--der">
        <h1 className="principal__titulo">
          {data.strapiMedios.principal.titulo}
        </h1>
        <p className="principal__texto">
          {data.strapiMedios.principal.contenido}
        </p>
      </div>
    </section>
    <Cta
      estilo="cta-informacion__boton"
      mensaje="¡Gracias por preferirnos!"
      textoBoton="Contáctanos de manera directa a contacto@maximiza.com.ve"
      link="/contacto"
    />
  </Layout>
);

export default Medios;

export const query = graphql`
  query MedioslQuery {
    strapiMedios {
      seo {
        titulo
        descripcion
        imagen
      }
      principal {
        titulo
        contenido
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 630)
            }
          }
        }
        seo_imagen {
          texto_alternativo
          titulo
        }
      }
    }
  }
`;

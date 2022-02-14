import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Cta from "../components/ctaInformacion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./capital.scss";

const Capital = ({ data }) => (
  <Layout>
    <Seo
      title={data.strapiPrivateEquity.seo.titulo}
      description={data.strapiPrivateEquity.seo.descripcion}
      image={data.strapiPrivateEquity.seo.imagen}
    />
    <section className="principal">
      <div className="columna columna--izq">
        <GatsbyImage
          className="principal__imagen"
          image={getImage(data.strapiPrivateEquity.principal.imagen.localFile)}
          alt={data.strapiPrivateEquity.principal.seo_imagen.texto_alternativo}
          title={data.strapiPrivateEquity.principal.seo_imagen.titulo}
        />
      </div>
      <div className="columna columna--der">
        <h1 className="principal__titulo">
          {data.strapiPrivateEquity.principal.titulo}
        </h1>
        <p className="principal__texto">
          {data.strapiPrivateEquity.principal.contenido}
        </p>
      </div>
    </section>
    <section className="partners">
      <h2 className="partners__titulo">
        {data.strapiPrivateEquity.partners_titulo}
      </h2>
      <ul className="partners__lista">
        {data.strapiPrivateEquity.partners_secciones.map((item) => (
          <li className="partners__item" key={item.id}>
            <GatsbyImage
              className="partners__imagen"
              image={getImage(item.imagen.localFile)}
              alt={item.seo_imagen.texto_alternativo}
              title={item.seo_imagen.titulo}
            />
            <ReactMarkdown
              className="partners__descripcion"
              children={item.contenido}
              remarkPlugins={[remarkGfm]}
              skipHtml={false}
            />
          </li>
        ))}
      </ul>
    </section>
    <Cta
      estilo="cta-informacion__boton"
      mensaje="¡Gracias por preferirnos!"
      textoBoton="Obtenga más información"
      link="/contacto"
    />
  </Layout>
);

export default Capital;

export const query = graphql`
  query CapitalQuery {
    strapiPrivateEquity {
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
          titulo
          texto_alternativo
        }
      }
      partners_titulo
      partners_secciones {
        id
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 630)
            }
          }
        }
        seo_imagen {
          titulo
          texto_alternativo
        }
        contenido
      }
    }
  }
`;

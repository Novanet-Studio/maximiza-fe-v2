import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Flecha from "../assets/images/dropdown.svg";
import "./responsabilidad.scss";

const Responsabilidad = ({ data }) => {
  return (
    <Layout>
      <Seo
        title={data.strapiResponsabilidad.seo.titulo}
        description={data.strapiResponsabilidad.seo.descripcion}
        image={data.strapiResponsabilidad.seo.imagen}
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">
            {data.strapiResponsabilidad.principal.titulo}
          </h1>
          <ReactMarkdown
            className="principal__texto"
            children={data.strapiResponsabilidad.principal.contenido}
            skipHtml={false}
          />
        </div>
        <div className="columna columna--der">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(
              data.strapiResponsabilidad.principal.imagen.localFile
            )}
            alt={
              data.strapiResponsabilidad.principal.seo_imagen.texto_alternativo
            }
            title={data.strapiResponsabilidad.principal.seo_imagen.titulo}
          />
        </div>
      </section>
      <section className="contribuciones">
        <h2>{data.strapiResponsabilidad.contribucion_titulo}</h2>
        <ul className="contribuciones__lista">
          {data.strapiResponsabilidad.contribuciones_secciones.map((item) => (
            <li key={item.id} className="contribuciones__item">
              <h3 className="contribuciones__titulo">{item.titulo}</h3>
              <ReactMarkdown
                className="contribuciones__descripcion"
                children={item.contenido}
                skipHtml={false}
              />
              <img
                className="contribuciones__flecha"
                src={Flecha}
                alt="Desplegar más"
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="causas">
        <h2 className="causas__titulo">Causas que apoyamos</h2>
        <ReactMarkdown
          className="descripcion"
          children={data.strapiResponsabilidad.colaboracion_texto}
          remarkPlugins={[remarkGfm]}
          skipHtml={false}
        />
        <ul className="causas__lista">
          <li key="as" className="causas__item">
            <StaticImage
              className="causas__imagen"
              src="../assets/images/causas-as.jpeg"
              alt="Alimenta la solidaridad logo"
              title="Alimenta la solidaridad"
            />
            <p className="causas__texto">Alimenta la solidaridad</p>
          </li>
          <li key="ccc" className="causas__item">
            <StaticImage
              className="causas__imagen"
              src="../assets/images/causas-ccc.jpeg"
              alt="Logo Cámara de Comercio de Caracas"
              title="Logo Cámara de Comercio de Caracas"
            />
            <p className="causas__texto">Cámara de Comercio de Caracas</p>
          </li>
          <li key="fa" className="causas__item">
            <StaticImage
              className="causas__imagen"
              src="../assets/images/causas-fa.jpeg"
              alt="Fe Y Alegría logo"
              title="Fe Y Alegría logo"
            />
            <p className="causas__texto">Fe y Alegría</p>
          </li>
          <li key="acide" className="causas__item">
            <StaticImage
              className="causas__imagen"
              src="../assets/images/causas-acide.jpeg"
              alt="Acide logo"
              title="Acide logo"
            />
            <p className="causas__texto">Acide</p>
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Responsabilidad;

export const query = graphql`
  query ResponsabilidadQuery {
    strapiResponsabilidad {
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
      contribucion_titulo
      contribuciones_secciones {
        id
        titulo
        contenido
      }
      colaboracion_texto
    }
  }
`;

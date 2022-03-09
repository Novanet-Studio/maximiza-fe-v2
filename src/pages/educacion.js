import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Cta from "../components/ctaInformacion";
import "./educacion.scss";

const Educacion = ({ data }) => {
  const dataSource = data.strapiEducacionPopulateDeep.data.attributes;
  return (
    <Layout>
      <Seo
        title="Educación en corretaje de títulos valores"
        description="Somos pioneros en ofrecer programas de capacitación para mejorar la educación financiera en Venezuela."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1646847317/maximiza/v4/maximiza_educacion_miniatura_5a3e3b347e.webp"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">{dataSource.principal.titulo}</h1>
          <ReactMarkdown
            className="principal__texto"
            children={dataSource.principal.contenido}
            remarkPlugins={[remarkGfm]}
            skipHtml={true}
          />
        </div>
        <div className="columna columna--der">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(
              dataSource.principal.imagen.data.attributes.localFile
            )}
            alt={dataSource.principal.imagen.data.attributes.alternativeText}
          />
        </div>
      </section>

      <section className="innovar">
        <h2>{dataSource.items_titulo}</h2>
        <ul className="innovar__lista">
          {dataSource.items.map((item) => (
            <li className="innovar__item" key={item.id}>
              <GatsbyImage
                className="innovar__imagen"
                image={getImage(item.imagen.data.attributes.localFile)}
                alt={item.imagen.data.attributes.alternativeText}
              />
              <div className="innovar__textos">
                <h3 className="innovar__subtitulo">{item.titulo}</h3>
                <ReactMarkdown
                  className="innovar__descripcion"
                  children={item.contenido}
                  remarkPlugins={[remarkGfm]}
                  skipHtml={true}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="programas">
        <h2>{dataSource.programas_titulo}</h2>
        <div className="programas__secciones">
          {dataSource.programas.map((item) => (
            <div className="programas__grupos" key={item.id}>
              <GatsbyImage
                className="programas__imagen"
                image={getImage(item.imagen.data.attributes.localFile)}
                alt={item.imagen.data.attributes.alternativeText}
              />
              <ul className="programas__lista">
                {item.mercados.map((mercado) => (
                  <li className="programas__item" key={mercado.id}>
                    <h3 className="programas__titulo">{mercado.titulo}</h3>
                    <p className="programas__descripcion">
                      {mercado.contenido}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Cta
        estilo="cta-informacion__boton"
        mensaje="¡Gracias por preferirnos!"
        textoBoton="Obtenga más información"
        link="/contacto"
      />
    </Layout>
  );
};

export default Educacion;

export const query = graphql`
  query EducacionQuery {
    strapiEducacionPopulateDeep {
      data {
        attributes {
          principal {
            titulo
            contenido
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 630)
                    }
                  }
                }
              }
            }
          }
          items_titulo
          items {
            id
            titulo
            contenido
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 157)
                    }
                  }
                }
              }
            }
          }
          programas_titulo
          programas {
            id
            seccion
            mercados {
              id
              titulo
              contenido
            }
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 390)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

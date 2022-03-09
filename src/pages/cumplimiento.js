import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Modal from "../components/modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @fortawesome libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./cumplimiento.scss";
// add fas and fab to the library
library.add(fas);

const Legal = ({ data }) => {
  const dataSource = data.strapiLegalPopulateDeep.data.attributes;
  const [targetModal, setTargetModal] = useState("");
  return (
    <Layout>
      <Seo
        title="Maximiza: Legitimación de capitales"
        description="Las instituciones financieras pueden usarse para la legitimación de capitales, ¿cómo prevenir que eso ocurra?"
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1646847317/maximiza/v4/maximiza_cumplimiento_miniatura_3c4db9b532.webp"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">{dataSource.principal.titulo}</h1>
          <p className="principal__texto">{dataSource.principal.contenido}</p>
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

      <section className="informacion">
        <ul className="informacion__lista">
          {dataSource.informacion.map((item) => (
            <li className="informacion__item" key={item.id}>
              <div className="informacion__descripcion">
                <h3 className="informacion__titulo">{item.titulo}</h3>
                <ReactMarkdown
                  className="informacion__texto"
                  children={item.contenido.substring(0, 90).concat("...")}
                  remarkPlugins={[remarkGfm]}
                  skipHtml={false}
                />
                <button
                  className="informacion__button"
                  onClick={() => setTargetModal(item.id)}
                >
                  Conocer más
                </button>
              </div>
            </li>
          ))}
          <Modal
            id={targetModal}
            data={dataSource.informacion}
            onClose={() => setTargetModal("")}
          />
        </ul>
      </section>

      <section className="etica">
        <GatsbyImage
          className="etica__imagen"
          image={getImage(dataSource.codigo.imagen.data.attributes.localFile)}
          alt={dataSource.codigo.imagen.data.attributes.alternativeText}
        />
        <div className="etica__contenido">
          <h2 className="etica__titulo">{dataSource.codigo.titulo}</h2>
          <p className="etica__texto">{dataSource.codigo.contenido}</p>
        </div>
      </section>

      <section className="normativas">
        <h2>{dataSource.normativas_titulo}</h2>
        <ul className="normativas__lista">
          {dataSource.descargas.map((item) => (
            <li className="normativas__item" key={item.id}>
              <div className="normativas__descarga">
                <div className="normativas__ver">
                  <FontAwesomeIcon icon={["fas", "eye"]} fixedWidth size="1x" />
                </div>
                <a className="normativas__down" href={item.vinculo} download>
                  <FontAwesomeIcon
                    icon={["fas", "download"]}
                    fixedWidth
                    size="1x"
                  />
                </a>
              </div>
              <p className="normativas__contenido">{item.documento}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Legal;

export const query = graphql`
  query LegalQuery {
    strapiLegalPopulateDeep {
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
          informacion {
            id
            titulo
            contenido
          }
          codigo {
            titulo
            contenido
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 430)
                    }
                  }
                }
              }
            }
          }
          normativas_titulo
          descargas {
            id
            documento
            vinculo
          }
        }
      }
    }
  }
`;

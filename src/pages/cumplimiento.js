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
  const [targetModal, setTargetModal] = useState("");
  return (
    <Layout>
      <Seo
        title={data.strapiLegal.seo.titulo}
        description={data.strapiLegal.descripcion}
        image={data.strapiLegal.seo.imagen}
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">
            {data.strapiLegal.principal.titulo}
          </h1>
          <p className="principal__texto">
            {data.strapiLegal.principal.contenido}
          </p>
        </div>
        <div className="columna columna--der">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(data.strapiLegal.principal.imagen.localFile)}
            alt={data.strapiLegal.principal.seo_imagen.texto_alternativo}
            title={data.strapiLegal.principal.seo_imagen.titulo}
          />
        </div>
      </section>

      <section className="informacion">
        <ul className="informacion__lista">
          {data.strapiLegal.informacion.map((item) => (
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
            data={data.strapiLegal.informacion}
            onClose={() => setTargetModal("")}
          />
        </ul>
      </section>

      <section className="etica">
        <GatsbyImage
          className="etica__imagen"
          image={getImage(data.strapiLegal.codigo.imagen.localFile)}
          alt={data.strapiLegal.codigo.seo_imagen.texto_alternativo}
          title={data.strapiLegal.codigo.seo_imagen.titulo}
        />
        <div className="etica__contenido">
          <h2 className="etica__titulo">{data.strapiLegal.codigo.titulo}</h2>
          <p className="etica__texto">{data.strapiLegal.codigo.contenido}</p>
        </div>
      </section>

      <section className="normativas">
        <h2>{data.strapiLegal.normativas_titulo}</h2>
        <ul className="normativas__lista">
          {data.strapiLegal.descargas.map((item) => (
            <li className="normativas__item" key={item.id}>
              <div className="normativas__descarga">
                <div className="normativas__ver">
                  <FontAwesomeIcon
                    icon={["fas", "eye"]}
                    fixedWidth
                    size="1x"
                  />
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
    strapiLegal {
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
      informacion {
        id
        titulo
        contenido
      }
      codigo {
        titulo
        contenido
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 430)
            }
          }
        }
        seo_imagen {
          texto_alternativo
          titulo
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
`;

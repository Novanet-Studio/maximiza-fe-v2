import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Aliados from "../components/aliados";
import Modal from "../components/modal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @fortawesome libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./empresa.scss";
// add fas and fab to the library
library.add(fas);

const Empresa = ({ data }) => {
  const [targetModal, setTargetModal] = useState("");
  return (
    <Layout>
      <Seo
        title={data.strapiEmpresa.seo.titulo}
        description={data.strapiEmpresa.seo.descripcion}
        image={data.strapiEmpresa.seo.imagen}
      />
      <section className="principal">
        <div className="columna columna--izq">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(data.strapiEmpresa.principal.imagen.localFile)}
            alt={data.strapiEmpresa.principal.seo_imagen.texto_alternativo}
            title={data.strapiEmpresa.principal.seo_imagen.titulo}
          />
        </div>

        <div className="columna columna--der">
          <h1 className="principal__titulo">
            {data.strapiEmpresa.principal.titulo}
          </h1>
          <p className="principal__texto">
            {data.strapiEmpresa.principal.contenido}
          </p>
        </div>
      </section>

      <section className="historia">
        <ul className="historia__lista">
          {data.strapiEmpresa.historia.map((item) => (
            <li className="historia__item" key={item.id}>
              <GatsbyImage
                className="historia__image"
                image={getImage(item.imagen.localFile)}
                alt={item.seo_imagen.texto_alternativo}
                title={item.seo_imagen.titulo}
              />
              <div className="historia__descripcion">
                <h3 className="historia__titulo">{item.titulo}</h3>
                <ReactMarkdown
                  className="historia__texto"
                  children={item.contenido.substring(0, 190).concat("...")}
                  remarkPlugins={[remarkGfm]}
                  skipHtml={false}
                />
                <button
                  className="historia__button"
                  onClick={() => setTargetModal(item.id)}
                >
                  Conocer más
                </button>
              </div>
            </li>
          ))}
          <Modal
            id={targetModal}
            data={data.strapiEmpresa.historia}
            imageFieldName="imagen"
            onClose={() => setTargetModal("")}
          />
        </ul>
      </section>

      <section className="equipo">
        <h2>{data.strapiEmpresa.equipo.titulo}</h2>
        <p className="descripcion">{data.strapiEmpresa.equipo.contenido}</p>
      </section>

      <section className="nosotros">
        <ul className="nosotros__lista">
          {data.strapiEmpresa.nosotros.map((item) => (
            <li className="nosotros__item" key={item.id}>
              <h3 className="nosotros__titulo">{item.titulo}</h3>
              <ReactMarkdown
                className="nosotros__descripcion"
                children={item.contenido}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
              />
              <GatsbyImage
                className="nosotros__imagen"
                image={getImage(item.imagen.localFile)}              
                alt={item.seo_imagen.texto_alternativo}
                title={item.seo_imagen.titulo}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="aliados">
        <h2>{data.strapiEmpresa.aliados.titulo}</h2>
        <p className="aliados__descripcion">
          {data.strapiEmpresa.aliados.contenido}
        </p>
        <Aliados />
      </section>

      <section className="balances">
        <h2>Balances mensuales</h2>
        {data.strapiEmpresa.balances.map((item) => (
          <div className="balances__grupo">
            <h3 className="balances__subtitulo">{item.ano}</h3>
            <ul className="balances__lista" key={item.id}>
              {item.mes.map((element) => (
                <li className="balances__item" key={element.id}>
                  <a
                    className="balances__boton"
                    href={element.archivo_descarga}
                    download
                  >
                    <FontAwesomeIcon
                      icon={["fas", "download"]}
                      fixedWidth
                      size="1x"
                    />
                    {element.mes}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Empresa;

export const query = graphql`
  query EmpresaQuery {
    strapiEmpresa {
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
      historia {
        id
        titulo
        contenido
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 450)
            }
          }
        }
        seo_imagen {
          texto_alternativo
          titulo
        }
      }
      equipo {
        titulo
        contenido
      }
      aliados {
        id
        titulo
        contenido
      }
      nosotros {
        id
        titulo
        contenido
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 375)
            }
          }          
        }
        seo_imagen {
          texto_alternativo
          titulo
        }
      }
      balances {
        id
        ano
        mes {
          id
          mes
          archivo_descarga
        }
      }
    }
  }
`;

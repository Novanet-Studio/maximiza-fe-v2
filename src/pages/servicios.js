import React, { useState } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../layout/layout";
import Modal from "../components/modal";
import Seo from "../components/seo";
import Flecha from "../assets/images/dropdown.svg";
import Cta from "../components/ctaInformacion";
import "./servicios.scss";

const Servicios = ({ data }) => {
  const dataSource = data.strapiServicioPopulateDeep.data.attributes;
  const [targetModal, setTargetModal] = useState("");

  return (
    <Layout>
      <Seo
        title="Maximiza inversiones en la bolsa"
        description="Ofrecemos diferentes estrategias financieras para gestionar sus inversiones  en la bolsa de valores."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1646847320/maximiza/v4/maximiza_servicios_miniatura_98daf48fa5.webp"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">
            <ReactMarkdown
              children={dataSource.principal.titulo}
              remarkPlugins={[remarkGfm]}
              skipHtml={false}
              linkTarget="_blank"
            />
          </h1>
          <p className="principal__texto">
            {dataSource.principal.contenido}
          </p>
        </div>
        <div className="columna columna--der">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(dataSource.principal.imagen.data.attributes.localFile)} 
            alt={dataSource.principal.imagen.data.attributes.alternativeText}
          />
        </div>
      </section>
      <section className="inversionista">
        {dataSource.inversionista.map((item) => (
          <div className="inversionista__grupo" key={item.id} id={item.identidad}>
            <div className="inversionista__cabecera">
              <h3 className="inversionista__titulo">{item.nombre}</h3>
              <GatsbyImage
                className="inversionista__imagen"
                image={getImage(item.imagen.data.attributes.localFile)}
                alt={item.imagen.data.attributes.alternativeText}
              />
            </div>
            <ul className="inversionista__contenido">
              {item.items.map((element) => (
                <li
                  className="inversionista__item"
                  key={element.id}
                  data-id={element.id}                  
                >
                  <GatsbyImage
                    className="inversionista__icono"
                    image={getImage(element.icono.data.attributes.localFile)}
                    alt="Iconos servicos"
                  />
                  <h4 className="inversionista__subtitulo">{element.titulo}</h4>
                  <img
                    className="inversionista__flecha"
                    src={Flecha}
                    alt="Desplegar más"
                  />

                  <div className="inversionista__dropdown">
                    <strong className="inversionista__texto">
                      {element.titulo}
                    </strong>
                    <ReactMarkdown
                      className="inversionista__descripcion"
                      children={element.contenido
                        .substring(0, 200)
                        .concat("...")}
                      skipHtml={false}
                    />
                    <button
                      className="inversionista__boton"
                      onClick={() => setTargetModal(element.id)}
                    >
                      Leer más
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <Modal
              id={targetModal}
              data={item.items}
              imageFieldName="icono"
              onClose={() => setTargetModal("")}
            />
          </div>
        ))}
      </section>
      <section className="comisiones">
        <h2 className="comisiones__titulo">Comisiones vigentes</h2>
        <ul className="comisiones__lista">
          <li className="comisiones__lista__item">
            <h4>Compra/Venta de títulos valores</h4>
            <p> Hasta 5% del monto transado</p>
          </li>
          <li className="comisiones__lista__item">
            <h4>Estructuración de instrumentos de deuda</h4>
            <p>Hasta 5% del monto emitido</p>
          </li>
          <li className="comisiones__lista__item">
            <h4>Colocación de instrumentos de deuda</h4>
            <p>Hasta 5% del monto colocado</p>
          </li>
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
};

export default Servicios;

export const query = graphql`
  query ServiciosQuery {
    strapiServicioPopulateDeep {
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
          inversionista {
            id
            nombre
            identidad
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 320)
                    }
                  }
                }
              }
            }
            items {
              id
              titulo
              contenido
              icono {
                data {
                  attributes {
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 320)
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
  }
`;

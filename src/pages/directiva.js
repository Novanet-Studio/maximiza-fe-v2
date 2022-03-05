import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "./directiva.scss";

const Directiva = ({ data }) => {
  const principal =
    data.allStrapiDirectivaPopulateDeep.edges[0].node.data.attributes.principal;
  const secciones =
    data.allStrapiDirectivaPopulateDeep.edges[0].node.data.attributes.secciones
      .seccion;

  return (
    <Layout>
      <div>{console.log(secciones)}</div>
      <Seo
        title="Junta directiva"
        description={principal.contenido}
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300652/maximiza/uploads/maximiza_com_ve_inicio_289286fe23.jpg"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(principal.imagen.data.attributes.localFile)}
            alt={principal.imagen.data.attributes.alternativeText}
          />
        </div>

        <div className="columna columna--der">
          <h1 className="principal__titulo">{principal.titulo}</h1>
          <p className="principal__texto">{principal.contenido}</p>
        </div>
      </section>
      <section className="secciones">
        <Accordion allowZeroExpanded={true}>
          {secciones.map((seccion) => (
            <AccordionItem key={seccion.id}>
              <AccordionItemHeading className="accordion__heading">
                <AccordionItemButton>
                  <div className="accordion__info">
                    <GatsbyImage
                      className="accordion__image"
                      image={getImage(seccion.imagen.data.attributes.localFile)}
                      alt={seccion.imagen.data.attributes.alternativeText}
                    />
                    <h2 className="accordion__title">{seccion.titulo}</h2>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className="accordion__panel">
                <ul className="accordion__list">
                  {seccion.personas.map((item) => (
                    <li key={item.id} className="accordion__list-item">
                      <h3>{item.persona}</h3>
                      <p>{item.cargo}</p>
                      <small className="accordion__list-item__title">{item.descripcion}</small>
                    </li>
                  ))}
                </ul>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Layout>
  );
};

export default Directiva;

export const query = graphql`
  query DirectivaQuery {
    allStrapiDirectivaPopulateDeep {
      edges {
        node {
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
              secciones {
                seccion {
                  id
                  titulo
                  imagen {
                    data {
                      attributes {
                        alternativeText
                        localFile {
                          childImageSharp {
                            gatsbyImageData(width: 310)
                          }
                        }
                      }
                    }
                  }
                  personas {
                    cargo
                    descripcion
                    id
                    persona
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

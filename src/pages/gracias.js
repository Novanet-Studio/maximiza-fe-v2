import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import "./medios.scss";

const Gracias = ({ data }) => {
const dataSource = data.strapiContactoPopulateDeep.data.attributes
  return (
    <Layout>
      <Seo
        title="Gracias por enviar su mensaje"
        description="Somos una casa de bolsa que ofrece innovadoras herramientas para la inversión, gestión y estructuración de activos financieros."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300652/maximiza/uploads/maximiza_com_ve_inicio_289286fe23.jpg"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(dataSource.principal.imagen.data.attributes.localFile)}
            alt={dataSource.principal.imagen.data.attributes.alternativeText}
          />
        </div>
        <div className="columna columna--der">
          <h1 className="principal__titulo">¡Mensaje enviado!</h1>
          <p className="principal__texto">
            Gracias por contactarnos, su mensaje será respondido a la brevedad
            posible.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Gracias;

export const query = graphql`
  query GraciasQuery {
    strapiContactoPopulateDeep {
      data {
        attributes {
          principal {
            titulo
            contenido
            imagen {
              data {
                attributes {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 630)
                    }
                  }
                  alternativeText
                }
              }
            }
          }
        }
      }
    }
  }
`;

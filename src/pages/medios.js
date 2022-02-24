import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import Cta from "../components/ctaInformacion";
import "./medios.scss";

const Medios = ({ data }) => {
  const dataSource = data.strapiMedioPopulateDeep.data.attributes;
  return (
    <Layout>
      <Seo
        title="Medios de Comunicacion"
        description="Exposicion de Maximiza en los medios de comunicacion tradicionales"
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300636/maximiza/uploads/maximiza_com_ve_medios_c4817dee31.jpg"
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
          <h1 className="principal__titulo">
            {dataSource.principal.titulo}
          </h1>
          <p className="principal__texto">
            {dataSource.principal.contenido}
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
};

export default Medios;

export const query = graphql`
  query MedioslQuery {
    strapiMedioPopulateDeep {
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
        }
      }
    }
  }
`;

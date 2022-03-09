import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import "./contacto.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @fortawesome libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./contacto.scss";

// add fas and fab to the library
library.add(fab);

const Contacto = ({ data }) => {
  const dataSource = data.strapiContactoPopulateDeep.data.attributes
  return (
    <Layout>
      <Seo
        title="Maximiza: contacto"
        description="Somos una casa de bolsa que ofrece innovadoras herramientas para la inversión, gestión y estructuración de activos financieros."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1646847320/maximiza/v4/maximiza_contacto_miniatura_7e7d7d94e8.webp"
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

      <section className="datos">
        <div className="columna columna--izq">
          <ul className="datos__lista">
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon
                  icon={["fas", "envelope"]}
                  fixedWidth
                  size="1x"
                />
              </span>
              <p className="datos__texto">contacto@maximiza.com.ve</p>
            </li>
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon icon={["fas", "phone"]} fixedWidth size="1x" />
              </span>
              <p className="datos__texto">
                Master +58 (212) 9539447 <br /> Fax +58 (212) 9573365 / 3366
              </p>
            </li>
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon
                  icon={["fas", "map-marker-alt"]}
                  fixedWidth
                  size="1x"
                />
              </span>
              <p className="datos__texto">
                Avenida Francisco de Miranda, Torre Europa, Piso 3, Oficinas
                3-B3. El Rosal, Caracas, Venezuela.
              </p>
            </li>
          </ul>
        </div>
        <div className="columna columna--der">
          <form
            className="datos__form"
            method="POST"
            data-netlify="true"
            name="contacto"
            action="/gracias/"
          >
            <label>
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contacto" />
            </label>

            <input
              type="text"
              name="name"
              placeholder="Nombre y apellido"
              className="datos__input"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="datos__input"
            />
            <textarea name="message" className="datos__textarea" />
            <input
              type="submit"
              className="datos__button"
              value="Enviar mensaje ➤"
            />
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;

export const query = graphql`
  query ContactQuery {
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

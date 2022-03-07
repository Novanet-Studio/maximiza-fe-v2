import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// @fortawesome libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./contacto.scss";

// add fas and fab to the library
library.add(fab);

const Sugerencias = ({ data }) => {
  const dataSource = data.strapiSugerenciaPopulateDeep.data.attributes;

  return (
    <Layout>
      <Seo
        title="Maximiza - Sugerencias"
        description="Envienos sus quejas, reclamos y/o sugerencias sobre temas de nuestra competencia."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300646/maximiza/uploads/maximiza_com_ve_contacto_5d0c32ef6a.jpg"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(
              dataSource.principal.imagen.data.attributes.localFile
            )}
            alt={dataSource.principal.imagen.data.attributes.alternativeText}
          />
        </div>
        <div className="columna columna--der">
          <h1 className="principal__titulo">{dataSource.principal.titulo}</h1>
          <p className="principal__texto">{dataSource.principal.contenido}</p>
        </div>
      </section>

      <section className="datos">
        <div className="columna columna--izq">
          <i className="datos__texto">
            {dataSource.info_sugerencias} <br />
            <br />
          </i>
          <ul className="datos__lista">
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon
                  icon={["fas", "building"]}
                  fixedWidth
                  size="1x"
                />
              </span>
              <p className="datos__texto">
                Av. Francisco Fracisco de Miranda Torre Europa Piso 3 Oficina
                3-B3 Caracas 1060 – Estado Miranda.
              </p>
            </li>
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon
                  icon={["fas", "earth-americas"]}
                  fixedWidth
                  size="1x"
                />
              </span>
              <p className="datos__texto">Sitio web: maximiza.com.ve</p>
            </li>
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon
                  icon={["fas", "envelope"]}
                  fixedWidth
                  size="1x"
                />
              </span>
              <p className="datos__texto">maximizaprevencion@maximiza.com.ve</p>
            </li>
            <li className="datos__item">
              <span className="datos__icono">
                <FontAwesomeIcon icon={["fas", "phone"]} fixedWidth size="1x" />
              </span>
              <p className="datos__texto">
                Máster:(58) 212-9539447 <br /> Fax (58) 212-9573316
              </p>
            </li>
          </ul>
        </div>
        <div className="columna columna--der">
          <form
            className="datos__form"
            name="sugerencias"
            enctype="multipart/form-data"
            data-netlify="true"
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
              type="number"
              name="cedula"
              placeholder="Cédula de identidad"
              className="datos__input"
            />

            <input
              type="text"
              name="rif"
              placeholder="RIF"
              className="datos__input"
            />

            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="datos__input"
            />

            <input
              type="number"
              name="telefono"
              placeholder="Teléfono"
              className="datos__input"
            />

            <textarea
              name="message"
              className="datos__textarea"
              placeholder="Descripción"
            />

            <input id="d01" name="file" className="datos__file" type="file" />

            <div className="datos__generico">
              <label htmlFor="d01" className="datos__button datos__button-a">
                Adjuntar documentos que avalen el mensaje.
              </label>
            </div>

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

export default Sugerencias;

export const query = graphql`
  query SugerenciasQuery {
    strapiSugerenciaPopulateDeep {
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
          info_sugerencias
        }
      }
    }
  }
`;

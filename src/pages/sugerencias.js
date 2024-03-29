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
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1646847317/maximiza/v4/maximiza_sugerencias_miniatura_3f6598f24d.webp"
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
            method="POST"
            encType="multipart/form-data"
            data-netlify="true"
            action="/gracias/"
          >
            <label>
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="sugerencias" />
            </label>

            <input
              type="text"
              name="nombre"
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
              name="mensaje"
              className="datos__textarea"
              placeholder="Descripción"
            />
            <div className="datos__archivo">
              <small>
                Agregue la documentación que avale el contenido del mensaje.
              </small>
            </div>
            <div className="datos__archivo" id="Fields">
              <div>
                <input
                  id="id00"
                  name="archivo_1"
                  className="datos__file"
                  type="file"
                />
              </div>
              <div>
                <input
                  id="id01"
                  name="archivo_2"
                  className="datos__file"
                  type="file"
                />
              </div>
              <div>
                <input
                  id="id02"
                  name="archivo_3"
                  className="datos__file"
                  type="file"
                />
              </div>
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

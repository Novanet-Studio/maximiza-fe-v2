import axios from "axios";
import React, { useState } from "react";
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

const GETFORM_FORM_ENDPOINT = process.env.GETFORM_ENDPOINT;

const Sugerencias = ({ data }) => {
  const dataSource = data.strapiSugerenciaPopulateDeep.data.attributes;
  const [formStatus, setFormStatus] = useState(false);
  const [query, setQuery] = useState({
    name: "",
    email: "",
  });

  const handleFileChange = () => (e) => {
    setQuery((prevState) => ({
      ...prevState,
      files: e.target.files[0],
    }));
  };

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });

    axios
      .post(GETFORM_FORM_ENDPOINT, formData, {
        headers: { Accept: "application/json" },
      })
      .then(function (response) {
        setFormStatus(true);
        setQuery({
          nombre: "",
          cedula: "",
          rif: "",
          email:"",
          message:"",
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <Seo
        title="Contacto"
        description="Somos una casa de bolsa que ofrece innovadoras herramientas para la inversión, gestión y estructuración de activos financieros."
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
            acceptCharset="UTF-8"
            method="POST"
            encType="multipart/form-data"
            id="gatsbyForm"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="datos__input"
              placeholder="Nombre y apellido"
              required
              name="nombre"
              value={query.name}
              onChange={handleChange()}
            />

            <input
              type="text"
              className="datos__input"
              placeholder="Cédula de identidad"
              required
              name="cedula"
              min="7"
              max="9"
              value={query.name}
              onChange={handleChange()}
            />

            <input
              type="text"
              className="datos__input"
              placeholder="RIF"
              required
              name="rif"
              value={query.name}
              onChange={handleChange()}
            />

            <input
              type="email"
              className="datos__input"
              placeholder="Correo"
              required
              name="email"
              value={query.email}
              onChange={handleChange()}
            />

            <textarea
              name="message"
              className="datos__textarea"
              placeholder="Descripción"
              rows="3"
            />

            <input
              id="d01"
              name="file"
              className="datos__file"
              type="file"
              placeholder="Select a file to upload"
              onChange={handleFileChange()}
            />

            <div className="datos__generico">
              <label htmlFor="d01" className="datos__button datos__button-a">
                Adjuntar documentos que avalen el mensaje.
              </label>
            </div>

            {formStatus ? (
              <div className="text-success mb-2">
                Su mensaje ha sido enviado.
              </div>
            ) : (
              ""
            )}
            <button type="submit" className="datos__button">
              Enviar mensaje
            </button>
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

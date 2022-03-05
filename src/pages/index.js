import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LayoutIndex from "../layout/layoutIndex";
import Seo from "../components/seo";
import Logo from "../assets/images/logo-maximiza.svg";
import LinkNav from "../components/linkNav";
import "./index.scss";

const Index = ({ data }) => {
  const dataSource = data.strapiHomePopulateDeep.data.attributes;

  return (
    <LayoutIndex>
      <Seo
        title="Maximiza Casa de Bolsa"
        description="Casa de bolsa dedicada a la asesoría financiera y a la gestión de activos transados en el mercado bursátil."
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300652/maximiza/uploads/maximiza_com_ve_inicio_289286fe23.jpg"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <img
            src={Logo}
            title="Maximiza logo"
            alt="Maximiza logo"
            className="principal__logo"
          />
          <p className="principal__texto principal__texto--corto">
            {dataSource.principal.logo_texto}
          </p>
          <LinkNav
            estilo="principal__boton"
            text="Quiero saber más"
            to="/empresa"
          />
        </div>
        <div className="columna columna--der">
          <GatsbyImage
            className="principal__imagen"
            image={getImage(
              dataSource.principal.imagen.data.attributes.localFile
            )}
            alt={dataSource.principal.imagen.data.attributes.alternativeText}
          />
        </div>
      </section>

      <section className="beneficios">
        <h2>{dataSource.beneficios_titulo}</h2>
        <ul className="beneficios__lista">
          {dataSource.beneficios.map((item) => (
            <li className="beneficios__item" key={item.id}>
              <h3 className="beneficios__subtitulo">{item.titulo}</h3>
              <ReactMarkdown
                className="beneficios__descripcion"
                children={item.contenido}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="servicios">
        <h2>{dataSource.servicios_titulo}</h2>
        <ul className="servicios__lista">
          {dataSource.servicios.map((item) => (
            <li className="servicios__item" key={item.id}>
              <h3 className="servicios__subtitulo">{item.titulo}</h3>
              <p className="servicios__descripcion">{item.contenido}</p>
              <Link to={item.link}>
                <GatsbyImage
                  className="servicios__imagen"
                  image={getImage(item.imagen.data.attributes.localFile)}
                  alt={item.imagen.data.attributes.alternativeText}
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="contacto">
        <h2 className="contacto__titulo">{dataSource.contacto_titulo}</h2>
        <p className="contacto__descripcion">
          {dataSource.contacto_descripcion}
        </p>
        <form
          className="form"
          method="POST"
          data-netlify="true"
          name="inicio"
          action="/gracias/"
        >
          <div className="form__grupo-izq">
            <label>
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="inicio" />
            </label>

            <input
              type="text"
              name="name"
              placeholder="Nombre y apellido"
              className="form__input"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="form__input"
            />
            <textarea name="message" className="form__textarea" />
          </div>
          <div className="form__grupo-der">
            <input
              type="submit"
              className="datos__button"
              value="Enviar mensaje ➤"
            />
          </div>
        </form>
      </section>
    </LayoutIndex>
  );
};

export default Index;

export const query = graphql`
  query IndexQuery {
    strapiHomePopulateDeep {
      data {
        attributes {
          principal {
            logo_texto
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
          servicios_titulo
          servicios {
            id
            titulo
            contenido
            link
            imagen {
              data {
                attributes {
                  alternativeText
                  localFile {
                    childImageSharp {
                      gatsbyImageData(width: 390)
                    }
                  }
                }
              }
            }
          }
          beneficios_titulo
          beneficios {
            titulo
            id
            contenido
          }
          contacto_titulo
          contacto_descripcion
        }
      }
    }
  }
`;

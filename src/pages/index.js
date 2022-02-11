import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LayoutIndex from "../layout/layoutIndex";
import Seo from "../components/seo";
import Logo from "../assets/images/logo-maximiza.svg";
import LinkNav from "../components/linkNav";
import "./index.scss";

const Index = ({ data }) => {
  return (
    <LayoutIndex>
      <Seo
        title={data.strapiHome.seo.titulo}
        description={data.strapiHome.seo.descripcion}
        image={data.strapiHome.seo.imagen}
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
            {data.strapiHome.principal.logo_texto}
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
            image={getImage(data.strapiHome.principal.imagen.localFile)}
            title={data.strapiHome.principal.seo_imagen.titulo}
            alt={data.strapiHome.principal.seo_imagen.texto_alternativo}
          />
        </div>
      </section>

        <section className="beneficios">
        <h2>{data.strapiHome.beneficios_titulo}</h2>
        <ul className="beneficios__lista">
          {data.strapiHome.beneficios.map((item) => (
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
        <h2>{data.strapiHome.servicios_titulo}</h2>
        <ul className="servicios__lista">
          {data.strapiHome.servicios.map((item) => (
            <li className="servicios__item" key={item.id}>
              <h3 className="servicios__subtitulo">{item.seo_imagen.titulo}</h3>
              <p className="servicios__descripcion">
                {item.seo_imagen.contenido}
              </p>
              <GatsbyImage
                className="servicios__imagen"
                image={getImage(item.imagen.localFile)}
                title={item.seo_imagen.titulo}
                alt={item.seo_imagen.texto_alternativo}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className="contacto">
        <h2 className="contacto__titulo">{data.strapiHome.contacto_titulo}</h2>
        <p className="contacto__descripcion">
          Si desea mayor información de nuestros servicios, escríbanos y nos
          comunicaremos con usted a la brevedad posible.
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
    strapiHome {
      seo {
        titulo
        descripcion
        imagen
      }
      principal {
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 630)
            }
          }
        }
        seo_imagen {
          titulo
          texto_alternativo
        }
        logo_texto
      }
      beneficios_titulo
      beneficios {
        id
        titulo
        contenido
      }
      servicios_titulo
      servicios {
        id
        titulo
        contenido
        imagen {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 390)
            }
          }
        }
        seo_imagen {
          titulo
          texto_alternativo
        }
      }
      contacto_titulo
    }
  }
`;

import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link, graphql } from "gatsby";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "../pages/blog.scss";

const BlogTemplate = ({ data }) => {
  const isBrowser = typeof window !== "undefined";
  const viewUrl = () => {
    if (!isBrowser) {
      return;
    }
    return window.location.href;
  };
  return (
    <Layout>
      <Seo
        title={data.strapiArticulos.titulo}
        description={data.strapiArticulos.descripcion}
        image={data.strapiArticulos.imagen.publicURL}
      />
      <section className="articulo__principal">
        <Link className="articulo__boton-regreso" to="/blog">
          « Volver al blog
        </Link>
        <GatsbyImage
          className="articulo__imagen"
          image={getImage(data.strapiArticulos.imagen.localFile)}
          alt={data.strapiArticulos.seo_imagen.texto_alternativo}
          title={data.strapiArticulos.seo_imagen.titulo}
        />
        <h1 className="articulo__titulo">{data.strapiArticulos.titulo}</h1>
      </section>

      <article className="articulo">
        <ReactMarkdown
          className="articulo__descripcion"
          children={data.strapiArticulos.descripcion}
          remarkPlugins={[remarkGfm]}
          skipHtml={false}
        />
        <div className="articulo__compartir">
          <h3>Comparte este artículo</h3>
          <LinkedinShareButton url={viewUrl()} children="a">
            <LinkedinIcon size={28} />
          </LinkedinShareButton>
          <TwitterShareButton url={viewUrl()} children="a">
            <TwitterIcon size={28} />
          </TwitterShareButton>
        </div>
      </article>
    </Layout>
  );
};

export default BlogTemplate;

export const query = graphql`
  query ArticuloTemplateQuery($id: String) {
    strapiArticulos(id: { eq: $id }) {
      titulo
      descripcion
      imagen {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 1280)
          }
        }
      }
      seo_imagen {
        texto_alternativo
        titulo
      }
    }
  }
`;

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

const shareUrl = window.location.href;

const BlogTemplate = ({ data }) => (
  <Layout>
    <Seo
      title={data.strapiArticulo.titulo}
      description={data.strapiArticulo.descripcion}
      image={data.strapiArticulo.imagen.publicURL}
    />
    <section className="articulo__principal">
      <Link className="articulo__boton-regreso" to="/blog">
        « Volver al blog
      </Link>
      <GatsbyImage
        className="articulo__imagen"
        image={getImage(data.strapiArticulo.imagen.localFile)}
        alt={data.strapiArticulo.seo_imagen.texto_alternativo}
        title={data.strapiArticulo.seo_imagen.titulo}
      />
      <h1 className="articulo__titulo">{data.strapiArticulo.titulo}</h1>
    </section>

    <article className="articulo">
      <ReactMarkdown
        className="articulo__descripcion"
        children={data.strapiArticulo.descripcion}
        remarkPlugins={[remarkGfm]}
        skipHtml={false}
      />
      <div className="articulo__compartir">
        <h3>Comparte este artículo</h3>
        <LinkedinShareButton url={shareUrl} children="a">
          <LinkedinIcon size={28} />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl} children="a">
          <TwitterIcon size={28} />
        </TwitterShareButton>
      </div>
    </article>
  </Layout>
);

export default BlogTemplate;

export const query = graphql`
  query BlogTemplateQuery($id: String) {
    strapiArticulo(id: { eq: $id }) {
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

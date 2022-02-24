import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Layout from "../layout/layout";
import Seo from "../components/seo";
import "./blog.scss";

const Blog = ({ data }) => {
  const dataSource = data.strapiBlogPopulateDeep.data.attributes;
  const articlesSource = data.articulos.edges[0].node;
  return (
    <Layout>
      <Seo
        title="Maximiza: Artículos con información financiera"
        description="{data.strapiBlog.descripcion}"
        image="https://res.cloudinary.com/novanet-studio/image/upload/v1605300636/maximiza/uploads/maximiza_com_ve_blog_e20e9516c2.jpg"
      />
      <section className="principal">
        <div className="columna columna--izq">
          <h1 className="principal__titulo">{dataSource.principal.titulo}</h1>
          <p className="principal__texto">{dataSource.principal.contenido}</p>
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

      <section className="blog">
        <ul className="blog__lista">
          {articlesSource.data.map((articulo) => (
            <li className="blog__item" key={articulo.id}>
              <div className="blog__cabecera">
                <GatsbyImage
                  className="blog__imagen"
                  image={getImage(
                    articulo.attributes.imagen.data.attributes.localFile
                  )}
                  alt={
                    articulo.attributes.imagen.data.attributes.alternativeText
                  }
                />
                <h4 className="blog__titulo">{articulo.attributes.titulo}</h4>
              </div>
              <p className="blog__fecha">{articulo.attributes.fecha}</p>
              <ReactMarkdown
                className="blog__texto"
                children={articulo.attributes.descripcion
                  .substring(0, 200)
                  .concat("...")}
                remarkPlugins={[remarkGfm]}
                skipHtml={false}
              />
              <Link className="blog__botton" to={articulo.attributes.slug}>
                Ver post
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query BlogQuery {
    strapiBlogPopulateDeep {
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

    articulos: allStrapiArticulosPopulateDeep2 {
      edges {
        node {
          data {
            id
            attributes {
              titulo
              fecha(formatString: "DD MMMM YYYY")
              descripcion
              slug
              imagen {
                data {
                  attributes {
                    alternativeText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 375)
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
  }
`;

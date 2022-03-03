exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allStrapiArticulosPopulateDeep2 {
          edges {
            node {
              data {
                attributes {
                  titulo
                  descripcion
                  slug
                  imagen {
                    data {
                      attributes {
                        alternativeText
                        url
                        localFile {
                          childImageSharp {
                            gatsbyImageData(width: 1280)
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
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const articulos =
    result.data.allStrapiArticulosPopulateDeep2.edges[0].node.data;
  const articuloTemplate = require.resolve("./src/templates/articulo.js");

  articulos.forEach((item) => {
    createPage({
      path: `/blog/${item.attributes.slug}`,
      component: articuloTemplate,
      context: {
        articulo: item,
      },
    });
  });
};

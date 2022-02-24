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
                  slug
                }
                id
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

  const articulos = result.data.allStrapiArticulosPopulateDeep2.edges[0].node.data;
  const articuloTemplate = require.resolve("./src/templates/articulo.js"); 

  articulos.forEach((articulo) => {
    createPage({
      path: `/blog/${articulo.attributes.slug}`,
      component: articuloTemplate,
      context: {
        id: articulo.id,
      },
    });
  });
};


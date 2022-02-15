exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        articulos: allStrapiArticulos {
          edges {
            node {
              id
              Slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const articulos = result.data.articulos.edges;
  const articuloTemplate = require.resolve("./src/templates/articulo.js");

  articulos.forEach((articulo) => {
    createPage({
      path: `/blog/${articulo.node.Slug}`,
      component: articuloTemplate,
      context: {
        id: articulo.node.id,
      },
    });
  });
};

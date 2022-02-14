exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(
`
    {
      allStrapiArticulo {
        edges {
          node {
            id
            Slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors;
  }

  const articulos = data.allStrapiArticulo.edges;
  const articuloTemplate = require.resolve("./src/templates/articulo.js");

  articulos.forEach((articulo) => {
    createPage({
      path: `/blog/${articulo.node.slug}`,
      component: articuloTemplate,
      context: {
        id: articulo.node.id,
      },
    });
  });
  
}

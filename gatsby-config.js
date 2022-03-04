require("dotenv").config({
  path: `.env`,
});

/*
 Nivel de profundidad para estructuras hechas a partir de components y dynamic zones de Strapi.
 Más información en https://www.npmjs.com/package/strapi-plugin-populate-deep
*/
const pd = `?populate=deep`;
const pd2 = `?populate=deep,2`;

module.exports = {
  siteMetadata: {
    title: `Maximiza - Asesoría de inversión`,
    description: `Somos una casa de bolsa que ofrece innovadoras herramientas para la inversión, gestión y estructuración de activos financieros.`,
    author: `@novanetstudio`,
    image: `https://res.cloudinary.com/novanet-studio/image/upload/v1605300652/maximiza/uploads/maximiza_com_ve_inicio_289286fe23.jpg`,
    type: "website",
    siteUrl: "https://maximiza.com.ve",
    titleTemplate: " Maximiza",
    twitterUsername: "@novanetstudio",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sass",
      options: {
        additionalData: `@import "${__dirname}/src/assets/scss/styles";`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-4W17JXKS6P", // GA4
        ],
        /* gtagConfig: {
          optimize_id: "GTM-5LFLQGT",
          anonymize_ip: true,
          cookie_expires: 0,
        }, */
        pluginConfig: {
          head: true,
        },
      },
    },
    `gatsby-plugin-transition-link`,
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 100,
          breakpoints: [416, 736, 1024, 1280, 1366],
          backgroundColor: `transparent`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Maximiza`,
        short_name: `Maximiza`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00735f`,
        display: `standalone`,
        orientation: `portrait`,
        icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.API_URL,
        accessToken: process.env.API_TOKEN_SALT,
        collectionTypes: [`articulos${pd2}`],
        singleTypes: [
          `blog${pd}`,
          `capital${pd}`,
          `contacto${pd}`,
          `educacion${pd}`,
          `empresa${pd}`,
          `home${pd}`,
          `legal${pd}`,
          `medio${pd}`,
          `responsabilidad${pd}`,
          `servicio${pd}`,
        ],
        queryLimit: 1000,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};

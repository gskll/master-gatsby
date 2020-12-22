import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default {
  siteMetadata: {
    title: "Slicks Slices",
    siteUrl: "https://gatsby.pizza",
    description: "The best pizza place in Hamilton!",
    twitter: "@slickslices",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "qgjkjaa4",
        dataset: "production",
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};

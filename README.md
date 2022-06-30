<h1 align="center">
  Wrapper component for GatsbyImage, to be used with api data from Strapi v4
</h1>

Ideal for SSR since this image does not get processed by image-sharp

## 🚀 Quick start

Add the plugin

1. Initialize a new plugin from the starter with `gatsby new`

```shell
yarn add @seansly/gatsby-source-strapi-images
```

2. Include the plugin in a Gatsby site

Inside of the `gatsby-config.js` file of your site (in this case, `my-gatsby-site`), include the plugin in the `plugins` array:

```javascript
module.exports = {
  plugins: [
    // other gatsby plugins
    // ...
    "@seansly/gatsby-source-strapi-images",
  ],
};
```

3. Use the component

```javascript
interface SSRPageProps {
  data: {
    attributes: {
      Image: StrapiImageApiResponse,
    },
  };
}

const SSRPage = ({
  data: {
    attributes: { Image },
  },
}: SSRPageProps) => {
  return <StrapiImage image={Image} />;
};
```

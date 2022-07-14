<h1 align="center">
  Wrapper component for GatsbyImage, to be used with api data from Strapi v4
</h1>

Ideal for SSR since this image does not get processed by image-sharp

## 🚀 Quick start

1. Add the plugin

```shell
yarn add @seansly/gatsby-source-strapi-images
```

2. Include the plugin in a Gatsby site

Inside of the `gatsby-config.js` file of your site, include the plugin in the `plugins` array:

```javascript
module.exports = {
  plugins: [
    // other gatsby plugins
    // ...
    "@seansly/gatsby-source-strapi-images",
  ],
};
```

3. Define a urlBuilder function, you would create this based on what media options are in your strapi configuration.

```javascript
export default function urlBuilder({
  baseUrl,
  width,
  height,
  format,
  options,
}: any) {
  let formats = baseUrl.formats;
  console.log(baseUrl, width);
  if (width > 2000 || width == baseUrl.width) {
    return baseUrl.url;
  } else if (formats.large && width > 750) {
    return formats.large.url;
  } else if (formats.medium && width > 500) {
    return formats.medium.url;
  } else {
    return formats.small.url;
  }
}
```

3. Use the component

```javascript
import {
  StrapiImage,
  StrapiImageApiResponse,
  StrapiImageListApiResponse
} from "@seansly/gatsby-source-strapi-images";
import { urlBuilder } from "./urlBuilder";

interface SSRPageProps {
  Image: StrapiImageApiResponse;
  ImageList: StrapiImageListApiResponse;
}

const SSRPage = ({serverData}) => {
  
  return (
    <>
      <StrapiImage image={Image} urlBuilder={urlBuilder} />
      {ImageList && ImageList.data.map((image, i) => {
        return (
          <StrapiImage image={image} urlBuilder={urlBuilder} />
         );
       })};
    </>);
};
```


Currently don't have a way to pass strapi image sizes into the plugin, so the urlBuilder must be created outside the plugin.  But you can wrap this component with your own that passes the same urlBuilder every time.


```javascript
import { StrapiImageApiResponse } from "@seansly/gatsby-source-strapi-images";
import * as React from "react";
import {
  StrapiImage as SeanslyStrapiImage,
  StrapiImageProps as SeanslyStrapiImageProps,
} from "@seansly/gatsby-source-strapi-images";
import { urlBuilder as builder } from "../util/urlBuilder";

interface StrapiImageProps extends Omit<SeanslyStrapiImageProps, "urlBuilder"> {
  urlBuilder?: any;
}

export const StrapiImage = ({ urlBuilder, ...props }: StrapiImageProps) => {
  if (!urlBuilder) {
    urlBuilder = builder;
  }
  return (
    <SeanslyStrapiImage urlBuilder={urlBuilder} {...props}></SeanslyStrapiImage>
  );
};
```

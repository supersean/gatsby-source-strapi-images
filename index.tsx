import React from "react";
import {
  GatsbyImage,
  getImageData,
  GatsbyImageProps,
} from "gatsby-plugin-image";

export interface StrapiImageProps
  extends Omit<GatsbyImageProps, "image" | "alt"> {
  image: StrapiApiResponse;
  layout?: string;
  width?: number;
  height?: string;
  breakpoints?: number[];
  urlBuilder: any;
}

export interface StrapiImageData {
  url: string;
  formats: StrapiFormats;
  alternativeText: string;
  height: number;
  width: number;
  name: string;
}

interface StrapiApiResponse {
  data?: {
    attributes: StrapiImageData;
  };
  attributes?: StrapiImageData;
}

export interface StrapiImageListApiResponse {
  data: {
    attributes: StrapiImageData;
  }[];
}

export interface StrapiImageApiResponse {
  data: {
    attributes: StrapiImageData;
  };
}
export interface StrapiFormats {
  large: StrapiFormat;
  medium: StrapiFormat;
  small: StrapiFormat;
}
export interface StrapiFormat {
  url: string;
  height: number;
  width: number;
}

export function getExampleImageData({ image, urlBuilder, ...props }: any) {
  return getImageData({
    baseUrl: image.data.attributes,
    sourceWidth: image.data.attributes.width,
    sourceHeight: image.data.attributes.height,
    urlBuilder: urlBuilder,
    pluginName: "gatsby-source-example",
    formats: ["auto"],
    ...props,
  });
}

export const StrapiImage = ({
  image,
  layout = `constrained`,
  width,
  height,
  breakpoints = [500, 750, 1000, 1250, 1500, 1750, 2000],
  urlBuilder,
  ...props
}: StrapiImageProps) => {
  var imageObj;
  if (!image.data) {
    imageObj = { data: { attributes: image } };
  } else {
    imageObj = image;
  }

  const imageData = getExampleImageData({
    image: imageObj,
    width,
    height,
    breakpoints,
    layout,
    urlBuilder,
    ...props,
  });

  return (
    <>
      <GatsbyImage
        image={imageData}
        alt={imageObj.data.attributes.alternativeText}
        {...props}
      />
    </>
  );
};

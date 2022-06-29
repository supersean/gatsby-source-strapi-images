import React from "react";
import {
  GatsbyImage,
  getImageData,
  GatsbyImageProps,
} from "gatsby-plugin-image";

export interface StrapiImageProps extends Omit<GatsbyImageProps, "image"> {
  image: StrapiImageData;
  layout?: string;
  width?: number;
  height?: string;
  breakpoints?: [number];
}

export interface StrapiImageData {
  data: {
    url: string;
    formats: StrapiFormats;
  };
  alt: string;
  height: number;
  width: number;
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

function urlBuilder({ baseUrl, width, height, format, options }: any) {
  if (width < 501 && baseUrl.formats.small) {
    return baseUrl.formats.small.url;
  } else if (width < 701 && baseUrl.formats.medium) {
    return baseUrl.formats.medium.url;
  } else if (width < 1001 && baseUrl.formats.large) {
    return baseUrl.formats.large.url;
  } else {
    return baseUrl.url;
  }
}

export function getExampleImageData({ image, ...props }: any) {
  return getImageData({
    baseUrl: image.data,
    sourceWidth: image.width,
    sourceHeight: image.height,
    urlBuilder,
    pluginName: "gatsby-source-example",
    formats: ["auto"],
    ...props,
  });
}

export const StrapiImage = ({
  image,
  layout,
  width,
  height,
  breakpoints,
  ...props
}: StrapiImageProps) => {
  const imageData = getExampleImageData({
    image,
    width,
    height,
    breakpoints: [500, 700, 1000],
    layout: `constrained`,
    ...props,
  });
  console.log("local imageData", imageData);
  return (
    <>
      <GatsbyImage image={imageData} {...props} />
    </>
  );
};

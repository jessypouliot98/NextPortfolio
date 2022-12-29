import { ContentfulMediaImage } from './../types';

export const getContentfulImageSrc = (media: ContentfulMediaImage) => {
  return `https:${media.file.url}`;
};

export const getContentfulImageAlt = (media: ContentfulMediaImage) => {
  return media.title;
};

export const getContentfulImageProps = (media: ContentfulMediaImage) => {
  return {
    src: getContentfulImageSrc(media),
    alt: getContentfulImageAlt(media),
  };
};
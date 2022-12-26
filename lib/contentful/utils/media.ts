import { ContentfulMediaImage } from './../types';

export const getContentfulImageSrc = (media: ContentfulMediaImage, fallbackSrc?: string) => {
  return media.file.url ? `https:${media.file.url}` : fallbackSrc;
};

export const getContentfulImageAlt = (media: ContentfulMediaImage) => {
  return media.title;
};

export const getContentfulImageProps = (media: ContentfulMediaImage, fallbackSrc?: string) => {
  return {
    src: getContentfulImageSrc(media, fallbackSrc),
    alt: getContentfulImageAlt(media),
  };
};
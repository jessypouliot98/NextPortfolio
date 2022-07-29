export type ContentfulFileImage = {
  url: string,
  details: {
    size: number,
    image: {
      width: number,
      height: number,
    }
  },
  contentType: string,
};

export type ContentfulMediaImage = {
  title: string,
  description: string,
  file: ContentfulFileImage,
}

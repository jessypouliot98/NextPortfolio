import "server-only";
import * as contentful from "contentful"

let client: ReturnType<typeof contentful.createClient> | undefined;

export function getCms() {
  if (!client) {
    client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: process.env.CONTENTFUL_SPACE_ID!,
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  }
  return client;
}
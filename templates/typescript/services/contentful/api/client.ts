import { GraphQLClient } from 'graphql-request'
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const {
  CTF_CDA_ACCESS_TOKEN,
  CTF_CPA_ACCESS_TOKEN,
  CTF_SPACE_ID,
  CTF_ENV
} = publicRuntimeConfig;

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${CTF_SPACE_ID}`;

const createClient = (isPreview: boolean) => {
  const accessToken = isPreview || CTF_ENV === 'preview'
    ? CTF_CPA_ACCESS_TOKEN
    : CTF_CDA_ACCESS_TOKEN;

  const client = new GraphQLClient(CONTENTFUL_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  })

  return client
}

export default createClient;
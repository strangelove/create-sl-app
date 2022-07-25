import { GraphQLClient } from 'graphql-request'

const CTF_CDA_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CDA_ACCESS_TOKEN
const CTF_CPA_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CPA_ACCESS_TOKEN
const CTF_ENV = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT
const CTF_SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID

const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${CTF_SPACE_ID}`

const createClient = (isPreview: boolean) => {
  const accessToken =
    isPreview || CTF_ENV === 'preview'
      ? CTF_CPA_ACCESS_TOKEN
      : CTF_CDA_ACCESS_TOKEN

  const client = new GraphQLClient(CONTENTFUL_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  return client
}

export default createClient

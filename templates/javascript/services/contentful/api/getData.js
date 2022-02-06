import createClient from "./client";

/*
 * fetchData() creates a client and makes a request to the Contentful API.
 * getData() function returns refactored data object.
 */

function fetchData(query, isPreview) {
  const client = createClient(isPreview);
  return client.request(query);
}

/*
 * NOTE: Contetful API response is wrapped into data object
 * as part of their API spec, therefore we tend to flatten that
 * data object and return its first property: Object.values(result).flat()[0].
 */
export default async function getData({ query, isPreview = false }) {
  let data = null;
  let error = null;

  try {
    const result = await fetchData(query, isPreview);
    data = result !== null ? Object.values(result).flat()[0] : null;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

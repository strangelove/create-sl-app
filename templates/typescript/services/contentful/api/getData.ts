import createClient from "./client";

/*
 * The fetchData creates a client and makes a request to the Contentful API.
 * The getData function returns refactored data object.
 */

export interface QueryArgs {
  query: string;
  isPreview?: boolean;
}

export type APIresults<DataType> = {
  data: DataType | null;
  error: unknown | null;
};

function fetchData<DataType>(
  query: string,
  isPreview: boolean
): Promise<DataType> {
  const client = createClient(isPreview);

  return client.request<DataType>(query);
}

/*
 * NOTE: Contetful API response is wrapped into data object
 * as part of their API spec, therefore we tend to flatten that
 * data object and return its first property: Object.values(result).flat()[0].
 */
export default async function getData<DataType>({
  query,
  isPreview = false,
}: QueryArgs): Promise<APIresults<DataType>> {
  let data: DataType | null = null;
  let error: unknown | null = null;

  try {
    const result: DataType = await fetchData(query, isPreview);
    data = result !== null ? Object.values(result).flat()[0] : null;
  } catch (err) {
    error = err;
  }

  return { data, error };
}

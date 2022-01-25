import getData from "./getData";
import { homePageQuery } from "../queries/homePage";

export async function getHomePageData(isPreview) {
  return await getData({ query: homePageQuery, isPreview });
}

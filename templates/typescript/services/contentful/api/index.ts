import getData from './getData'
import { homePageQuery } from '../queries/homePage';

/*
  * NOTE : This is only an example interface. 
  * Import props types from schema.ts file.
*/

interface HomePageData {
  bannerEntryTitle: null,
  bannerTitle: any
}

export async function getHomePageData(isPreview: boolean) {
  return await getData<HomePageData>({ query: homePageQuery, isPreview });
}

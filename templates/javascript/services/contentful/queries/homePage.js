import { gql } from "graphql-request";

// * An example of a GraphQL query
export const homePageQuery = gql`
  {
    homepage(id: "4eqKdg89TT2LtEYNXWaxGJ") {
      bannerEntryTitle
      bannerTitle {
        json
      }
    }
  }
`;

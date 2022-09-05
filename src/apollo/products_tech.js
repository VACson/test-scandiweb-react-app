import { gql } from '@apollo/client';

export const ALL_TECH = gql`
  query ProductsTechQuery {
    category(input: { title: "tech" }) {
      name
      products {
        name
        id
        inStock
        gallery
        category
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

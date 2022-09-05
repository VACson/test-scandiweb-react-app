import { gql } from '@apollo/client';

export const ALL_CLOTHES = gql`
  query ProductsQuery {
    category(input: { title: "clothes" }) {
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

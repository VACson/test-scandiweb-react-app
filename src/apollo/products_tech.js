import { gql } from '@apollo/client';

export const ALL_TECH = gql`
  query ProductsTechQuery {
    category(input: { title: "tech" }) {
      name
      products {
        name
        id
        gallery
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

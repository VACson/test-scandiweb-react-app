import { gql } from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query getProd($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

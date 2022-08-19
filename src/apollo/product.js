import { gql } from '@apollo/client';

export const ALL_CLOTHES = gql`
  query ProductsQuery($id: ID!) {
    product (id: $id) {
    name
  }
`;

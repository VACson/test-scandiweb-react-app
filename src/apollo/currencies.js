import { gql } from '@apollo/client';

export const ALL_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

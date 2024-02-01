import { gql } from '../__generated__/gql';

export const GET_BOOKS = gql(`
  query GetBooks {
    products {
      getMany(input: {}) {
        data {
          id
          name
          photo
          desc
          price
          category {
            name
          }
        }
      }
    }
  }
`);

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const VARIABLES = { email: 'search-books@mali.ru', password: 'qsefth123', commandId: 'search-books' };

const SignIn = gql`
  mutation SignIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

const getClient = async () => {
  //   const token = await fetch('http://19429ba06ff2.vps.myjino.ru/api/signin', {
  //     method: 'POST',
  //     body: JSON.stringify({ email: 'search-books@mali.ru', password: 'qsefth123' }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.token);
  //   console.log(token);

  const signInClient = new ApolloClient({
    uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql',
    cache: new InMemoryCache(),
  });

  const token = await signInClient
    .mutate({
      mutation: SignIn,
      variables: { email: VARIABLES.email, password: VARIABLES.password },
    })
    .then(({ data }) => data.profile.signin.token);

  const authorization = 'Bearer ' + token;

  return new ApolloClient({
    uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql',
    cache: new InMemoryCache(),
    headers: { authorization },
  });
};

export const client = await getClient();

import pkg from '@apollo/client';
const { ApolloClient, gql, InMemoryCache } = pkg;

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        profile {
          id
        }
      }
    }
  }
`;

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        profile {
          id
          email
        }
        token
      }
    }
  }
`;

const variables = { email: 'search-books@mali.ru', password: 'qsefth123', commandId: 'search-books' };

function signUp() {
  const client = new ApolloClient({ uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql', cache: new InMemoryCache() });
  client.mutate({ mutation: SIGN_UP, variables }).then(({ data }) => console.log(data));
}

function signIn() {
  const client = new ApolloClient({ uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql', cache: new InMemoryCache() });
  client
    .mutate({ mutation: SIGN_IN, variables: { email: variables.email, password: variables.password } })
    .then(({ data }) => console.log(data.profile.signin.token));
}

// signUp();
signIn();

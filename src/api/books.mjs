import pkg from '@apollo/client';
const { ApolloClient, gql, InMemoryCache } = pkg;

const categories = [
  // { id: '65ba656940505ca249a20f1c', name: 'зарубежная классика' },
  // { id: '65ba656940505ca249a20f24', name: 'зарубежное фэнтэзи' },
  // { id: '65ba656940505ca249a20f20', name: 'зарубежные детективы' },
  // { id: '65ba656940505ca249a20f22', name: 'зарубежные детские книги' },
  // { id: '65ba656940505ca249a20f1e', name: 'манга' },
  // { id: '65ba656940505ca249a20f1a', name: 'ужасы' },
];

const books = [];

const variables = { email: 'search-books@mali.ru', password: 'qsefth123', commandId: 'search-books' };

const SignIn = gql`
  mutation SignIn($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
      }
    }
  }
`;

const UploadCategory = gql`
  mutation UploadCategory($input: CategoryAddInput!) {
    categories {
      add(input: $input) {
        id
      }
    }
  }
`;

const GetCategories = gql`
  query GetCategories {
    categories {
      getMany(input: {}) {
        data {
          id
          name
        }
      }
    }
  }
`;

const UploadProducts = gql`
  mutation UploadProducts($input: ProductAddInput!) {
    products {
      add(input: $input) {
        id
        name
      }
    }
  }
`;

async function fillDatabase() {
  const signInClient = new ApolloClient({
    uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql',
    cache: new InMemoryCache(),
  });
  const token = await signInClient
    .mutate({
      mutation: SignIn,
      variables: { email: variables.email, password: variables.password },
    })
    .then(({ data }) => data.profile.signin.token);

  const authorization = 'Bearer ' + token;

  console.log(authorization);

  const uploadClient = new ApolloClient({
    uri: 'http://cea3c11a3f62.vps.myjino.ru/graphql',
    cache: new InMemoryCache(),
    headers: { authorization },
  });

  // const categories = await uploadClient
  //   .query({ query: GetCategories, variables: {} })
  //   .then(({ data }) => data.categories.getMany.data);
  // console.log(categories);

  // categories.forEach((category) =>
  //   uploadClient
  //     .mutate({ mutation: UploadCategory, variables: category })
  //     .then(({ data }) => console.log(data.categories.add))
  // );

  // books.forEach((book) =>
  //   uploadClient
  //     .mutate({ mutation: UploadProducts, variables: { input: book } })
  //     .then(({ data }) => console.log(data.products.add))
  // );
}

fillDatabase();

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { Provider } from 'react-redux';
import store from '../store';
import { ApolloProvider } from '@apollo/client';
import { client } from '../services/apollo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;

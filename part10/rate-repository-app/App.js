import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import Main from './src/components/Main';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import createApolloClient from './src/utils/apolloClient';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);


const App = () => {
  console.log(Constants.manifest.extra.apolloUri);

  return (
    <>
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  </>
  )
};

export default App;

import { useMutation, useApolloClient, useQuery } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import { me } from '../graphql/queries';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
    const authStorage = useContext(AuthStorageContext);
    const { meResult } = useQuery(me, {
        fetchPolicy: 'cache-and-network',
         }
    );
    const [mutate, result] = useMutation(SIGN_IN);

    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
    
        const credentials = { username, password };

        const payload = await mutate({ variables: { credentials } });

        const { data } = payload;
    
        if (data && data.authenticate) {
          await authStorage.setAccessToken(data.authenticate.accessToken);
          console.log("Check me in singin: ", meResult);
          apolloClient.resetStore();
        }

    
        return payload;
      };
    
    
    return [signIn, result];
  };

  export default useSignIn;

import { useMutation, useApolloClient, useQuery } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';
import { me } from '../graphql/queries';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignUp = () => {
    const authStorage = useContext(AuthStorageContext);
    const { meResult } = useQuery(me, {
        fetchPolicy: 'cache-and-network',
         }
    );
    const [mutate, result] = useMutation(CREATE_USER);

    const apolloClient = useApolloClient();

    const signUp = async ({ username, password }) => {
    
        console.log('username', username);
        console.log('password', password)
        const user = { username, password };

        const payload = await mutate({ variables: { user } });

        console.log('payload', payload);
        const { data } = payload;
    
        return payload;
      };
    
    
    return [signUp, result];
  };

  export default useSignUp;
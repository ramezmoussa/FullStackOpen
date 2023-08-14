
import { useMutation, useApolloClient, useQuery } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';
import { me } from '../graphql/queries';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useCreateReview = () => {
    const authStorage = useContext(AuthStorageContext);
    const { meResult } = useQuery(me, {
        fetchPolicy: 'cache-and-network',
         }
    );
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const apolloClient = useApolloClient();

    const createReview = async ({ text, repositoryName, rating, ownerName }) => {
        
        const review = { text: text, repositoryName: repositoryName, rating: Number(rating), ownerName: ownerName};
        console.log(review)

        const payload = await mutate({ variables: { review } });

        const { data } = payload;

        return payload;
      };
    
    
    return [createReview, result];
  };

  export default useCreateReview;
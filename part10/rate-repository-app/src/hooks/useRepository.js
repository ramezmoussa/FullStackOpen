import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {

  const { data, loading, error  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {id}
  });

  const repository = data ? data.repository : undefined;
  const reviews = data ? data.repository.reviews.edges.map(edge => edge.node) : undefined;
  return { repository: repository, reviews: reviews };
};

export default useRepository;
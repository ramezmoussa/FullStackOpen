import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {


  const { data  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables

  });


  return { repositories: data ? data.repositories : undefined };
};

export default useRepositories;
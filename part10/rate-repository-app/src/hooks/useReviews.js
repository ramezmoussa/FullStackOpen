import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { me } from '../graphql/queries';

const useReviews = () => {


  const { data  } = useQuery(me, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
    }
    );
  return { reviews: data ? data.me.reviews.edges : undefined, username: data ? data.me.username : undefined};
};

export default useReviews;
import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection $searchKeyword: String) {
  repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
        totalCount
        edges {
          node {
            id
            name
            ownerName
            createdAt
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
          }
          cursor
        } 
      }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id
      name
      ownerName
      createdAt
      fullName
      reviewCount
      ratingAverage
      forksCount
      stargazersCount
      description
      language
      ownerAvatarUrl
      url

      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }  
    }
  }
`;


export const me = gql`
query getCurrentUser($includeReviews: Boolean = false){
  me {
    id
    username
    reviews @include(if: $includeReviews){
      edges {
        node {
          rating
          text
          repositoryId
          createdAt
        }
      }
    }
  }
}
`;
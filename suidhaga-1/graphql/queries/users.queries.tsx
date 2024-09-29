import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
	query GetAuthenticatedUser {
		authUser {
			_id
			phone
			username
			userType
      email
      name
  
		}
	}
`;
export const GET_USERS = gql`
  query users {
    users {
      _id
      username
      userType
      email
      phone
      name
    }
  }
`;
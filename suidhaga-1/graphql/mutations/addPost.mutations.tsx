import { gql } from "@apollo/client";

export const ADD_POST = gql`
	mutation CreatePost($input: postInput!) {
		createPost(input: $input) {
			title
            description
            createdAt
			image
		}
	}
`;
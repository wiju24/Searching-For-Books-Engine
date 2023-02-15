import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
            bookCount
        }
    }
`;
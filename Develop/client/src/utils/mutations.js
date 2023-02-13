import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation user ($email: String!, $password: String!) {
        user (email: $email, password: $password) {
            token
                user {
                    _id
                    email
                    username
                    bookCount
                    savedBooks {
                        bookId
                        title
                        authors
                        description
                        image
                        link
                    }
                }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser ($username: String!, $email: String!, $password: String!) {
        addUser (username: $username, email: $email, password: $password) {
            token
                user {
                    _id
                    email
                    username
                    bookCount
                    savedBooks {
                        bookId
                        title
                        authors
                        description
                        image
                        link
                    }
                }
        }
    }
`;


export const SAVE_BOOK = gql`
    mutation saveBk ($input: bookInput!) {
        saveBk(input: $input) {
            _id
            email
            username
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBk ($bookId: String!) {
        removeBk (bookId: $bookId) {
            _id
            email
            username
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`;
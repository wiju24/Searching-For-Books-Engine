const {gql} = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID
        username:String
        email:String
        password:String
        bookCount:Int
        savedBooks: [Book]
    }

    type Book {
        bookId:String
        authors: [String]
        description:String
        title:String
        image:String
        link:String
    }

    input booksInput {
        bookId:String
        authors:[String]
        descriptions:[String]
        title:String
        image:String
        link:String
    }

    type Auth {
        token: ID
        user:User
    }

    type Query {
        me:User
    }

    type Mutation {
        login(username: String!, email:String!, password: String!): Auth
        insertUser(username:String!, password:String!): Auth
        saveBook(input: booksInput): User
        removeBook(bookId:String!): User
    }
`

module.exports = typeDefs;
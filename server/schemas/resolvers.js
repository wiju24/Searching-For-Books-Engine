const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User
                .findOne({_id: context.user._id})
                .select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('You still need to log in!');
        }
    },

    Mutation: {

        login: async (parent, {email, password}) => {
            const user = await User
            .findOne({email});

                if (!user) {
                    throw new AuthenticationError('The Username is incorrect')
                }
            
            const pass = await user
            .isCorrectPassword(password);

                if (!pass) {
                    throw new AuthenticationError('The password is incorrect')
                }

            const token = signToken (user);
            return {token, user};
        },

        insertUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken (user);
            return {token, user};
        },

        saveBook: async (parent, {bookSearch}, context) => {
            if (context.user) {
                const bookSaved = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: bookSearch}},
                    {new: true}
                );
                return bookSaved;
            }
            throw new AuthenticationError('Must be logged in to move forward');
        },

        removeBook: async (parent, args, context) => {
            if(context.user) {
                const bookRemoved = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId:args.bookId}}},
                    {new: true}
                );

                return bookRemoved;
            }
            
            throw new AuthenticationError('Must be logged in to move forward');
        }
    }
};

module.exports = resolvers;
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/loginuser')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
  you can remove the placeholder query once your first own has been implemented 
*/

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  


  type Token {
    value: String!
  }

  type loginObject {
    user: User!
    token: Token!
  }
  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }


  type Mutation {
    createUser(
        username: String!
        favoriteGenre: String!
      ): User

    login(
        username: String!
        password: String!
      ): loginObject 

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
        name: String!
        setBornTo: Int!
      ): Author
  }
`

const resolvers = {
    Query: {

        me: (root, args, context) => {
            console.log("user: ", context.currentUser)
            return context.currentUser

        },
        bookCount: async () => {
            let allBooks = await Book.find({})
            
            return allBooks.length
        },
        authorCount: async () => {
            let allAuthors = await Author.find({})
            return allAuthors.length
        },
        allBooks: async (root, args) => {
            let result = await Book.find({}).populate('author')
            if (args.author != undefined)
                result = books.filter((book) => book.author.name === args.author)
            if (args.genre != undefined)
                result = result.filter((book) => book.genres.includes(args.genre))
            return result
        },
        allAuthors: async () => Author.find({}),
    },

    Author: {
        bookCount: async (parent) => {
            let allBooks = await Book.find({}).populate('author')
            return allBooks.filter((book) => book.author.name === parent.name).length;
        }
    },

    Mutation: {

        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        
            return user.save()
              .catch(error => {
                throw new GraphQLError('Creating the user failed', {
                  extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                  }
                })
              })
          },
            

        login: async (root, args, context) => {
            const user = await User.findOne({ username: args.username })
        
            if ( !user || args.password !== 'secret' ) {
              throw new GraphQLError('wrong credentials', {
                extensions: {
                  code: 'BAD_USER_INPUT'
                }
              })        
            }
        
            const userForToken = {
              username: user.username,
              id: user._id,
            }
            const token = {value: jwt.sign(userForToken, process.env.JWT_SECRET) }

            console.log("login output: ", user, token)
            return { user, token}
          },
        
        addBook: async (root, args, context) => {
            if(context.currentUser === undefined)
            {
                throw new GraphQLError('A valid user token must be passed', {
                    extensions: {
                      code: 'BAD_USER_INPUT'
                    }
                  })
            }
            let authorExists = await Author.findOne({"name": args.author})
            if(authorExists === null)
            {
                authorExists = new Author({name: args.author})
                try {
                    await authorExists.save()
                }
                catch(error) {
                    throw new GraphQLError('Saving Author failed \n' +  error, {
                      extensions: {
                        code: 'GRAPHQL_VALIDATION_FAILED',
                        error
                      }
                    })
                  }
            }    
            const book = new Book({ ...args, author: authorExists})
            
            try {
                await book.save()
            }
            catch(error) {
                console.log(error)
                throw new GraphQLError('Saving Book failed \n' + error, {
                  extensions: {
                    code: 'GRAPHQL_VALIDATION_FAILED',
                    error
                  }
                })
              }

            return book
        },

        editAuthor: async (root, args, context) => {
            if(context.currentUser === undefined)
            {
                throw new GraphQLError('A valid user token must be passed', {
                    extensions: {
                      code: 'BAD_USER_INPUT'
                    }
                  })
            }
            let author = await Author.findOneAndUpdate({"name": args.name}, {born: args.setBornTo}, {new: true})
            if (!author) {
              return null
            }
            return author
        },


    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        console.log(auth)
        if (auth && auth.startsWith('Bearer ')) {

          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
          console.log(decodedToken)
          const currentUser = await User
            .findById(decodedToken.id)
          console.log("current user: ", currentUser)
          return { currentUser }
        }

      },
    
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
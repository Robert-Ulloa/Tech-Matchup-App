const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Initialize the Apollo Server with the defined typeDefs and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server and integrate with Express
const startApolloServer = async () => {
  await server.start();

  // Middleware for parsing request body and GraphQL requests
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  // GraphQL route
  app.use('/graphql', expressMiddleware(server));

  // Serve client-side assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Fallback for all other routes, serving the main client page
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Start the server once the database connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the Apollo server
startApolloServer();
import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: '/graphql', // This should point to the correct GraphQL endpoint (make sure the proxy is set up correctly in vite.config.js)
  cache: new InMemoryCache(), // This handles the in-memory cache for performance
});

function App() {
  return (
    // Wrap your application in ApolloProvider to ensure the client is accessible throughout the app
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
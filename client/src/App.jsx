import './App.css';
import { Outlet } from 'react-router-dom';

// Uncomment import statement below after building queries and mutations
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

function App() {
  return (
    return (
      <ApolloProvider client={client}>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Outlet />
        </div>
      </ApolloProvider>
    );
  );
}

export default App;

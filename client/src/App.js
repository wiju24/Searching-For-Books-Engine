import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';


import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import Switch from 'react-bootstrap/esm/Switch';


const httpLink = createHttpLink ({
  uri: '/graphql',
});

const authenticationLink = setContext (( _, {headers}) =>{
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
  },
};
});

const client = new ApolloClient ({
  link: authenticationLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
  <ApolloProvider client = {client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          
          <Route exact path ='/' component = {SearchBooks} />
          <Route exact path ='/saved' component = {SavedBooks} />
          <Route render = {() => <h1 className='display-2'>Incorrect Page!</h1>} />

        </Switch>
      </>
    </Router>
  </ApolloProvider>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client'
import { UserContextProvider } from './contexts/UserContext'
import { MarkingPeriodContextProvider } from './components/home/MarkingPeriodContext'
import { EnumContextProvider } from './contexts/EnumContext'

const link = new HttpLink({
  uri: 'http://localhost:4005/graphql',
  credentials: 'include',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <UserContextProvider>
          <MarkingPeriodContextProvider>
            <EnumContextProvider>
              <App />
            </EnumContextProvider>
          </MarkingPeriodContextProvider>
        </UserContextProvider>
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

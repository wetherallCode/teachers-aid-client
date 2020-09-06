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
import { MarkingPeriodContextProvider } from './contexts/markingPeriod/MarkingPeriodContext'
import { EnumContextProvider } from './contexts/EnumContext'
import { SchoolDayContextProvider } from './components/dashboard/school-day/state/SchoolDayContext'

// const link = new HttpLink({
//   uri: 'https://mrwetherall.org/graphql',
//   credentials: 'same-origin',
// })
const link = new HttpLink({
  uri: 'https://teachers-aid-server.herokuapp.com/graphql',
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
              <SchoolDayContextProvider>
                <App />
              </SchoolDayContextProvider>
            </EnumContextProvider>
          </MarkingPeriodContextProvider>
        </UserContextProvider>
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
)

import React, { createContext, FC, ReactNode, useContext } from 'react'
import { me } from '../schemaTypes'
import { useQuery, gql } from '@apollo/client'

export const ME_QUERY = gql`
  query me {
    me {
      userName
      firstName
      lastName
      _id
      ... on Teacher {
        __typename
        title
        teachesCourses {
          _id
          name
        }
      }
      ... on Student {
        __typename
      }
    }
  }
`

const UserContext = createContext<any>(undefined)

type UserContextProps = {
  children: ReactNode
}

export const UserContextProvider: FC<UserContextProps> = ({ children }) => {
  const { loading, error, data } = useQuery<me>(ME_QUERY)
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  return (
    <UserContext.Provider value={data?.me}>{children}</UserContext.Provider>
  )
}

export function useUserContextProvider() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(
      'useUserContextProvider must be used within a UserContextProvider'
    )
  }
  return context
}

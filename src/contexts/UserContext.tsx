import React, { createContext, FC, ReactNode, useContext } from 'react'
import { me } from '../schemaTypes'
import { useQuery, gql } from '@apollo/client'

export const ME_QUERY = gql`
  query me {
    me {
      userName
      firstName
      lastName
      password
      isActive
      _id
      ... on Teacher {
        __typename
        title
        teachesCourses {
          _id
          name
          hasCourseInfo {
            startsAt
            endsAt
            halfDayStartsAt
            halfDayEndsAt
            hourDelayStartsAt
            hourDelayEndsAt
            schoolDayType
            assignmentsAllowedInClass
            isHidden
            checkReadingGuides
          }
        }
      }
      ... on Student {
        __typename
        hasIEP
        inCourses {
          _id
          name
          hasCourseInfo {
            _id
            startsAt
            endsAt
            halfDayStartsAt
            halfDayEndsAt
            hourDelayStartsAt
            hourDelayEndsAt
            schoolDayType
            assignmentsAllowedInClass
            isHidden
            checkReadingGuides
          }
        }
        hasWritingMetrics {
          overallWritingMetric {
            levelPoints
          }
        }
      }
    }
  }
`

const UserContext = createContext<any>(undefined)

type UserContextProps = {
  children: ReactNode
}

export const UserContextProvider = ({ children }: UserContextProps) => {
  const { loading, data } = useQuery<me>(ME_QUERY, {
    // onCompleted: (data) => console.log(data),
    onError: (error) => error && <div>Things went wrong, please refresh!</div>,
  })
  if (loading)
    return (
      <div
        style={{
          display: 'grid',
          fontSize: '3vw',
          color: 'var(--blue)',
          height: '100vh',
        }}
      >
        <div style={{ justifySelf: 'center', alignSelf: 'center' }}>
          <span>Starting the Server </span>
          <span aria-label='🚀🚀🚀' role='img'>
            🚀🚀🚀
          </span>
        </div>
      </div>
    )

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

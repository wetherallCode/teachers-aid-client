import React, { FC } from 'react'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'
import { CurrentSchoolDay } from './CurrentSchoolDay'
import { CreateSchoolDay } from './CreateSchoolDay'
import { EditSchoolDay } from './EditSchoolDay'
import { useNavigate } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
} from '../../../schemaTypes'
import { date } from '../../../utils'

export type SchoolDayProps = {}

export const FIND_CURRENT_SCHOOL_DAY_QUERY = gql`
  query findCurrentSchoolDay($input: FindSchoolDayByDateInput!) {
    findSchoolDayByDate(input: $input) {
      schoolDay {
        _id
        cohortWeek
        schoolDayCount
        currentSchoolDayType
        signInSheets {
          course {
            _id
          }
          studentsSignInlog {
            _id
            firstName
            lastName
          }
        }
      }
    }
  }
`

export const SchoolDay: FC<SchoolDayProps> = () => {
  const [state, event] = useSchoolDayContextProvider()
  const navigate = useNavigate()

  const { data, loading } = useQuery<
    findCurrentSchoolDay,
    findCurrentSchoolDayVariables
  >(FIND_CURRENT_SCHOOL_DAY_QUERY, {
    variables: {
      input: { date: date },
    },
    onCompleted: (data) => {
      if (data.findSchoolDayByDate.schoolDay)
        event({
          type: 'SET_TODAYS_SCHOOL_DAY',
          payload: data?.findSchoolDayByDate?.schoolDay!,
        })
    },
    onError: (error) => console.error(error),
  })
  return (
    <>
      <>
        {state.matches('currentSchoolDay') && (
          <>
            {data?.findSchoolDayByDate.schoolDay ? (
              <>
                <CurrentSchoolDay schoolDay={state.context.currentSchoolDay} />
                <button>Edit School Day</button>
              </>
            ) : (
              <>
                <div>No School Day</div>
                <button onClick={() => event({ type: 'CREATE_SCHOOL_DAY' })}>
                  Create School Day
                </button>
              </>
            )}
          </>
        )}
        {state.matches('createSchoolDay') && <CreateSchoolDay />}
        {state.matches('editSchoolDay') && <EditSchoolDay />}
      </>
      <>
        <button onClick={() => navigate('/dashboard/teachers-aid')}>
          Teacher's Aid
        </button>
        <button onClick={() => navigate('/lesson-home')}>Class Lesson</button>
      </>
    </>
  )
}

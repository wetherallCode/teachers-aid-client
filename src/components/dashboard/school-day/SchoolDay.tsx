import React, { FC, Fragment } from 'react'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'
import { CurrentSchoolDay } from './CurrentSchoolDay'
import { CreateSchoolDay } from './CreateSchoolDay'
import { EditSchoolDay } from './EditSchoolDay'
import { useNavigate } from 'react-router'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  findCurrentSchoolDay,
  findCurrentSchoolDayVariables,
  me_me_Teacher,
  createSignInSheets,
  createSignInSheetsVariables,
} from '../../../schemaTypes'
import { date } from '../../../utils'
import { useUserContextProvider } from '../../../contexts/UserContext'
import { CreateSignInSheets } from './CreateSignInSheets'
import {
  CreateSchoolDayButton,
  SchoolDayContainer,
} from '../teacher/teacherDashboardStyles'

export type SchoolDayProps = {}

export const FIND_CURRENT_SCHOOL_DAY_QUERY = gql`
  query findCurrentSchoolDay($input: FindSchoolDayByDateInput!) {
    findSchoolDayByDate(input: $input) {
      schoolDay {
        _id
        cohortWeek
        schoolDayCount
        schoolDayLength
        todaysDate
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
// export const CREATE_SIGN_IN_SHEETS_MUTATION = gql`
//   mutation createSignInSheets($input: CreateSignInSheetsInput!) {
//     createSignInSheets(input: $input) {
//       schoolDay {
//         _id
//       }
//     }
//   }
// `

export const SchoolDay = ({}: SchoolDayProps) => {
  const [state, event] = useSchoolDayContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
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

  const todaysCourses = me.teachesCourses.filter(
    (course) =>
      course.hasCourseInfo?.schoolDayType ===
      data?.findSchoolDayByDate.schoolDay?.currentSchoolDayType,
  )

  const hasSignInSheets =
    data?.findSchoolDayByDate.schoolDay?.signInSheets?.length! > 0

  return (
    <>
      {state.matches('currentSchoolDay') && (
        <>
          {data?.findSchoolDayByDate.schoolDay ? (
            <>
              <CurrentSchoolDay
                schoolDay={data.findSchoolDayByDate.schoolDay}
              />
              <CreateSchoolDayButton
                onClick={() => event({ type: 'EDIT_SCHOOL_DAY' })}
              >
                Edit School Day
              </CreateSchoolDayButton>
            </>
          ) : (
            <>
              <div>Not School Day</div>
              <CreateSchoolDayButton
                onClick={() => event({ type: 'CREATE_SCHOOL_DAY' })}
              >
                Create School Day
              </CreateSchoolDayButton>
            </>
          )}
        </>
      )}
      {state.matches('editSchoolDay') && (
        <EditSchoolDay schoolDay={data?.findSchoolDayByDate.schoolDay!} />
      )}
      {state.matches('createSchoolDay') && <CreateSchoolDay />}
    </>
  )
}

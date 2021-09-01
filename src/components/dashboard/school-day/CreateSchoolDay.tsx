import React, { FC, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSchoolDay,
  createSchoolDayVariables,
  findCurrentSchoolDayCount,
  StudentCohortEnum,
  SchoolDayType,
} from '../../../schemaTypes'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'

export type CreateSchoolDayProps = {}

export const CREATE_SCHOOL_DAY_MUTATION = gql`
  mutation createSchoolDay($input: CreateSchoolDayInput!) {
    createSchoolDay(input: $input) {
      schoolDay {
        _id
      }
    }
  }
`
export const FIND_CURRENT_SCHOOL_DAY_COUNT_QUERY = gql`
  query findCurrentSchoolDayCount {
    findSchoolDayTracker {
      schoolDayTracker {
        schoolDayTracker
        schoolDayTypeTracker
        cohortWeekTracker
      }
    }
  }
`
export const CreateSchoolDay: FC<CreateSchoolDayProps> = () => {
  const [state, event] = useSchoolDayContextProvider()

  useQuery<findCurrentSchoolDayCount>(FIND_CURRENT_SCHOOL_DAY_COUNT_QUERY, {
    onCompleted: (data) => {
      event({
        type: 'SET_CURRENT_SCHOOL_DAY_COUNT',
        payload: data.findSchoolDayTracker.schoolDayTracker.schoolDayTracker,
      })
      event({
        type: 'SET_CURRENT_SCHOOL_DAY_TYPE',
        payload:
          data.findSchoolDayTracker.schoolDayTracker.schoolDayTypeTracker,
      })
      event({
        type: 'SET_CURRENT_COHORT_WEEK',
        payload: data.findSchoolDayTracker.schoolDayTracker.cohortWeekTracker,
      })
    },

    onError: (error) => console.error(error),
  })

  const [createSchoolDay] = useMutation<
    createSchoolDay,
    createSchoolDayVariables
  >(CREATE_SCHOOL_DAY_MUTATION, {
    variables: {
      input: {
        cohortWeek: state.context.createSchoolDay.cohortWeek,
        schoolDayCount: state.context.createSchoolDay.schoolDayCount + 1,
        currentSchoolDayType: SchoolDayType.AB,
        // state.context.createSchoolDay.currentSchoolDayType,
        // state.context.createSchoolDay.currentSchoolDayType === SchoolDayType.A
        //   ? SchoolDayType.B
        //   : SchoolDayType.A,
      },
    },
    onCompleted: (data) => event({ type: 'CURRENT_SCHOOL_DAY' }),
    refetchQueries: ['findCurrentSchoolDayCount', 'findCurrentSchoolDay'],
  })

  useEffect(() => {
    event({
      type: 'SET_CURRENT_SCHOOL_DAY_TYPE',
      payload:
        state.context.createSchoolDay.currentSchoolDayType === SchoolDayType.A
          ? SchoolDayType.B
          : SchoolDayType.A,
    })
  }, [])

  const redWeek =
    state.context.createSchoolDay.cohortWeek === StudentCohortEnum.RED
  const whiteWeek =
    state.context.createSchoolDay.cohortWeek === StudentCohortEnum.WHITE

  // const aDay =
  //   state.context.createSchoolDay.currentSchoolDayType === SchoolDayType.A
  // const bDay =
  //   state.context.createSchoolDay.currentSchoolDayType === SchoolDayType.B

  return (
    <>
      <div>Create School Day</div>
      {/* <>
        <div>Cohort Week</div>
        <div
          style={
            redWeek
              ? { color: 'var(--red)', cursor: 'default' }
              : { color: 'var(--blue)', cursor: 'default' }
          }
          onClick={() =>
            event({
              type: 'SET_CURRENT_COHORT_WEEK',
              payload: StudentCohortEnum.RED,
            })
          }
        >
          Red Week
        </div>
        <div
          style={
            whiteWeek
              ? { color: 'var(--red)', cursor: 'default' }
              : { color: 'var(--blue)', cursor: 'default' }
          }
          onClick={() =>
            event({
              type: 'SET_CURRENT_COHORT_WEEK',
              payload: StudentCohortEnum.WHITE,
            })
          }
        >
          White Week
        </div>
      </> */}
      <>
        <div>What type of School Day?</div>
        {
          // state.context.createSchoolDay.currentSchoolDayType ===
          // SchoolDayType.A ?
          //  (
          <>
            <div
              style={
                state.context.createSchoolDay.currentSchoolDayType ===
                SchoolDayType.B
                  ? { color: 'var(--red)' }
                  : { color: 'var(--blue)' }
              }
              onClick={() =>
                event({
                  type: 'SET_CURRENT_SCHOOL_DAY_TYPE',
                  payload: SchoolDayType.B,
                })
              }
            >
              B Day
            </div>

            <div
              style={
                state.context.createSchoolDay.currentSchoolDayType ===
                SchoolDayType.A
                  ? { color: 'var(--red)' }
                  : { color: 'var(--blue)' }
              }
              onClick={() =>
                event({
                  type: 'SET_CURRENT_SCHOOL_DAY_TYPE',
                  payload: SchoolDayType.A,
                })
              }
            >
              A Day
            </div>
          </>
        }
      </>
      <>
        <div>What day of school is it?</div>
        <div>{state.context.createSchoolDay.schoolDayCount + 1}</div>
      </>
      <button onClick={() => createSchoolDay()}>Let's Start the Day!</button>
    </>
  )
}

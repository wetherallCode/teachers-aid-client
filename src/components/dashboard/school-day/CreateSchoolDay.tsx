import React, { FC, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSchoolDay,
  createSchoolDayVariables,
  findCurrentSchoolDayCount,
  StudentCohortEnum,
  SchoolDayType,
  SchoolDayLengthEnum,
} from '../../../schemaTypes'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'
import { useEnumContextProvider } from '../../../contexts/EnumContext'
import { phraseCapitalizer, underscoreEliminator } from '../../../utils'
import {
  CreateSchoolDayButton,
  CreateSchoolDayCenteredItem,
  CreateSchoolDayContainer,
  CreateSchoolDayInformationContainer,
} from '../teacher/teacherDashboardStyles'

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
export const CreateSchoolDay = ({}: CreateSchoolDayProps) => {
  const [state, event] = useSchoolDayContextProvider()
  const { schoolDayLengthEnum } = useEnumContextProvider()

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
        schoolDayLength: state.context.createSchoolDay.schoolDayLength,
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
    <CreateSchoolDayContainer>
      <CreateSchoolDayCenteredItem>
        Create School Day
      </CreateSchoolDayCenteredItem>
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
      {/* <>
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
      </> */}

      <CreateSchoolDayInformationContainer>
        <div>What day of school is it?</div>
        <div>{state.context.createSchoolDay.schoolDayCount + 1}</div>
      </CreateSchoolDayInformationContainer>
      <CreateSchoolDayInformationContainer>
        <div>School Day Length?</div>
        <select
          style={{ background: 'transparent', fontSize: '1.6vh' }}
          onChange={(e: any) =>
            event({
              type: 'SET_CURRENT_SCHOOL_DAY_LENGTH',
              payload: e.target.value,
            })
          }
        >
          {schoolDayLengthEnum.map((length: SchoolDayLengthEnum) => (
            <option
              key={length}
              value={length}
              style={{ color: 'var(--blue)' }}
            >
              {underscoreEliminator(phraseCapitalizer(length))}
            </option>
          ))}
        </select>
      </CreateSchoolDayInformationContainer>
      <CreateSchoolDayButton
        style={{
          gridColumn: '1/-1',
          alignSelf: 'center',
          justifySelf: 'center',
        }}
        onClick={() => createSchoolDay()}
      >
        Let's Start the Day!
      </CreateSchoolDayButton>
    </CreateSchoolDayContainer>
  )
}

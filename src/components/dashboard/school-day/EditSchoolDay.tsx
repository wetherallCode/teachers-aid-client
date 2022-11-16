import { gql, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useEnumContextProvider } from '../../../contexts/EnumContext'
import {
  findCurrentSchoolDay_findSchoolDayByDate_schoolDay,
  SchoolDayLengthEnum,
  updateSchoolDay,
  updateSchoolDayVariables,
} from '../../../schemaTypes'
import { underscoreEliminator, phraseCapitalizer } from '../../../utils'
import {
  EditSchoolDayContainer,
  EditSchoolDayTitle,
} from '../../home/homeStyles'
import { CreateSchoolDayButton } from '../teacher/teacherDashboardStyles'
import { useSchoolDayContextProvider } from './state/SchoolDayContext'

export type EditSchoolDayProps = {
  schoolDay: findCurrentSchoolDay_findSchoolDayByDate_schoolDay
}

export const EDIT_SCHOOL_DAY_MUTATION = gql`
  mutation updateSchoolDay($input: UpdateSchoolDayInput!) {
    updateSchoolDay(input: $input) {
      schoolDay {
        _id
        schoolDayLength
      }
    }
  }
`

export const EditSchoolDay = ({ schoolDay }: EditSchoolDayProps) => {
  const [state, event] = useSchoolDayContextProvider()
  const { schoolDayLengthEnum } = useEnumContextProvider()
  const [editedSchoolDayLength, setEditedSchoolDayLength] =
    useState<SchoolDayLengthEnum>(schoolDay.schoolDayLength)

  const [updateSchoolDay] = useMutation<
    updateSchoolDay,
    updateSchoolDayVariables
  >(EDIT_SCHOOL_DAY_MUTATION, {
    // variables: {
    //   input: {
    //     schoolDayId: schoolDay._id!,
    //     updatedCohortWeek: schoolDay.cohortWeek,
    //     updatedCurrentSchoolDayType: schoolDay.currentSchoolDayType,
    //     updatedDate: schoolDay.todaysDate,
    //     updatedSchoolDayCount: schoolDay.schoolDayCount,
    //     schoolDayLength: editedSchoolDayLength,
    //   },
    // },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findCurrentSchoolDay'],
  })
  const handleSchoolDayLengthChange = (e: any) => {
    setEditedSchoolDayLength(e.target.value)
    console.log(editedSchoolDayLength)
    updateSchoolDay()
  }

  return (
    <EditSchoolDayContainer>
      <EditSchoolDayTitle>Edit School Day</EditSchoolDayTitle>
      <EditSchoolDayTitle>
        <div>School Day Length?</div>
        <select
          style={{ background: 'transparent', fontSize: '1.6vh' }}
          value={state.context.currentSchoolDay.schoolDayLength}
          onChange={(e: any) => {
            updateSchoolDay({
              variables: {
                input: {
                  schoolDayId: schoolDay._id!,
                  updatedCohortWeek: schoolDay.cohortWeek,
                  updatedCurrentSchoolDayType: schoolDay.currentSchoolDayType,
                  updatedDate: schoolDay.todaysDate,
                  updatedSchoolDayCount: schoolDay.schoolDayCount,
                  schoolDayLength: e.target.value,
                },
              },
            })
          }}
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
      </EditSchoolDayTitle>
      <CreateSchoolDayButton>Remove School Day</CreateSchoolDayButton>
      <CreateSchoolDayButton
        onClick={() => event({ type: 'CURRENT_SCHOOL_DAY' })}
      >
        Go Back
      </CreateSchoolDayButton>
    </EditSchoolDayContainer>
  )
}

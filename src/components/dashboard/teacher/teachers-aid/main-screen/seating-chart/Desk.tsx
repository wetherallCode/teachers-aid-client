import React, { FC, useEffect, useState } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { DeskDisplay } from '../../styles/seatingChartStyles'
import {
  findStudentInfoByStudentIdForDesk,
  findStudentInfoByStudentIdForDeskVariables,
  me_me,
  StudentCohortEnum,
} from '../../../../../../schemaTypes'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'
import { gql, useQuery } from '@apollo/client'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'

export type DeskProps = { deskNumber: number }

export const FIND_STUDENT_INFO_FOR_DESK_QUERY = gql`
  query findStudentInfoByStudentIdForDesk($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        isActive
        firstName
        hasAbsences {
          _id
          dayAbsent
        }
      }
    }
  }
`

export const Desk: FC<DeskProps> = ({ deskNumber }) => {
  const [state, event] = useTeachersAidContextProvider()
  const me: me_me = useUserContextProvider()
  const [schoolDayState] = useSchoolDayContextProvider()
  const todaysDate = new Date().toLocaleDateString()
  const [cohortSwitch, setcohortSwitch] = useState(false)

  const [desk] = state.context.courseInfo!.assignedSeats.filter(
    (seat) => seat.deskNumber === deskNumber
  )

  const { loading, data } = useQuery<
    findStudentInfoByStudentIdForDesk,
    findStudentInfoByStudentIdForDeskVariables
  >(FIND_STUDENT_INFO_FOR_DESK_QUERY, {
    variables: {
      input: { studentId: desk.student?._id! },
    },
    // onCompleted: (data) =>
    // console.log(data.findStudentById.student.hasAbsences),
    // pollInterval: 1000,
    onError: (error) => console.error(error + 'desk'),
  })

  const isAbsent = data?.findStudentById.student.hasAbsences.some(
    (absence) => absence.dayAbsent === new Date().toLocaleDateString()
  )

  const redWeek = schoolDayState.context.currentSchoolDay.cohortWeek === 'RED'

  return (
    <>
      {!state.context.courseInfo!.cohortBasedSeating && (
        <DeskDisplay
          absent={isAbsent!}
          active={data?.findStudentById.student.isActive!}
          assigned={desk.student !== null}
          picked={state.context.studentId === desk.student?._id!}
          onClick={() => {
            if (desk.student) {
              event({ type: 'SET_STUDENT_ID', payload: desk.student?._id! })
            }
          }}
        >
          <div>{desk.student?.firstName ? desk.student.firstName : null}</div>
        </DeskDisplay>
      )}
      {state.context.courseInfo!.cohortBasedSeating && redWeek && (
        <DeskDisplay
          absent={isAbsent!}
          active={data?.findStudentById.student.isActive!}
          assigned={desk.redCohortStudent !== null}
          picked={state.context.studentId === desk.student?._id!}
          onClick={() => {
            console.log(desk.redCohortStudent?._id!)
            if (desk.redCohortStudent) {
              event({
                type: 'SET_STUDENT_ID',
                payload: desk.redCohortStudent?._id!,
              })
            }
          }}
        >
          <div>
            {desk.redCohortStudent?.firstName
              ? desk.redCohortStudent.firstName
              : null}
          </div>
        </DeskDisplay>
      )}
      {state.context.courseInfo!.cohortBasedSeating && !redWeek && (
        <DeskDisplay
          absent={isAbsent!}
          active={data?.findStudentById.student.isActive!}
          picked={state.context.studentId === desk.student?._id!}
          assigned={desk.whiteCohortStudent !== null}
          onClick={() => {
            if (desk.whiteCohortStudent) {
              event({
                type: 'SET_STUDENT_ID',
                payload: desk.whiteCohortStudent?._id!,
              })
            }
          }}
        >
          <div>
            {desk.whiteCohortStudent?.cohort === StudentCohortEnum.WHITE &&
              desk.whiteCohortStudent?.firstName}
          </div>
        </DeskDisplay>
      )}
    </>
  )
}

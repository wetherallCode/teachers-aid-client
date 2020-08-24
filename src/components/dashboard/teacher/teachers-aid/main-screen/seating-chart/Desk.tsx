import React, { FC, useState } from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { DeskDisplay } from '../../styles/seatingChartStyles'
import { StudentCohortEnum } from '../../../../../../schemaTypes'
import { useSchoolDayContextProvider } from '../../../../school-day/state/SchoolDayContext'

export type DeskProps = { deskNumber: number }

export type DeskDisplayProps = {
  absent: boolean
  assigned: boolean
}

export const Desk: FC<DeskProps> = ({ deskNumber }) => {
  const [state, event] = useTeachersAidContextProvider()
  const [schoolDayState] = useSchoolDayContextProvider()
  const todaysDate = new Date().toLocaleDateString()
  const [cohortSwitch, setcohortSwitch] = useState(false)

  const [desk] = state.context.courseInfo.assignedSeats.filter(
    (seat) => seat.deskNumber === deskNumber
  )

  const isAbsent = desk.student?.hasAbsences.some((absence) =>
    absence.dayAbsent.includes(todaysDate)
  )
  const redWeek = schoolDayState.context.currentSchoolDay.cohortWeek === 'RED'

  return (
    <>
      {!state.context.courseInfo.cohortBasedSeating && (
        <DeskDisplay
          absent={isAbsent!}
          assigned={desk.student !== null}
          onClick={() => {
            if (desk.student) {
              event({ type: 'SET_STUDENT_ID', payload: desk.student?._id! })
            }
          }}
        >
          <div>{desk.student?.firstName ? desk.student.firstName : null}</div>
        </DeskDisplay>
      )}
      {state.context.courseInfo.cohortBasedSeating && redWeek && (
        <DeskDisplay
          absent={isAbsent!}
          assigned={desk.redCohortStudent !== null}
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
      {state.context.courseInfo.cohortBasedSeating && !redWeek && (
        <DeskDisplay
          absent={isAbsent!}
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

import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { DeskDisplay } from '../styles/seatingChartStyles'

export type DeskProps = { deskNumber: number }
export type DeskDisplayProps = {
  absent: boolean
  assigned: boolean
}

export const Desk: FC<DeskProps> = ({ deskNumber }) => {
  const [state, event] = useTeachersAidContextProvider()
  const todaysDate = new Date().toLocaleDateString()

  const [desk] = state.context.courseInfo.assignedSeats.filter(
    (seat) => seat.deskNumber === deskNumber
  )
  const isAbsent = desk.student?.hasAbsences.some((absence) =>
    absence.dayAbsent.includes(todaysDate)
  )
  const isAssigned = desk.student !== null

  return (
    <DeskDisplay
      absent={isAbsent!}
      assigned={isAssigned}
      onClick={() => {
        if (desk.student)
          event({ type: 'SET_STUDENT_ID', payload: desk.student?._id! })
      }}
    >
      <div>{desk.student?.firstName ? desk.student.firstName : null}</div>
    </DeskDisplay>
  )
}

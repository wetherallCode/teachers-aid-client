import React, { FC } from 'react'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { DeskDisplay } from '../styles/seatingChartStyles'

export type DeskProps = { deskNumber: number }

export type DeskDisplayProps = {
  absent: boolean
  assigned: boolean
}

export const Desk: FC<DeskProps> = ({ deskNumber }) => {
  console.log(deskNumber)
  const [state, event] = useTeachersAidContextProvider()
  const todaysDate = new Date().toLocaleDateString()
  console.log(state.context.courseInfo.assignedSeats)
  const [desk] = state.context.courseInfo.assignedSeats.filter(
    (seat) => seat.deskNumber === deskNumber
  )

  const isAbsent = desk.student?.hasAbsences.some((absence) =>
    absence.dayAbsent.includes(todaysDate)
  )
  console.log(isAbsent)
  const isAssigned = desk.student !== null

  // isAssigned &&
  //   state.context.selectedProtocol.isActive &&
  //   console.log(state.context.studentProtocolAssessment.partnerIds)
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

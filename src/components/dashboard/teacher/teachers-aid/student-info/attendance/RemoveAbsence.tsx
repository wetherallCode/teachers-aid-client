import React from 'react'
import { AttendanceButton } from '../../styles/studentInfoStyles'
import { RemoveAbsenceType } from './DailyAttendance'

export type RemoveAbsenceProps = {
  absenceId: string
  removeAbsence: RemoveAbsenceType
  called: boolean
}

export const RemoveAbsence = ({
  absenceId,
  removeAbsence,
  called,
}: RemoveAbsenceProps) => {
  return (
    <AttendanceButton
      lateButton={false}
      created={true}
      onClick={() =>
        removeAbsence({ variables: { input: { _id: absenceId } } })
      }
    >
      {/* {called ? '...' : 'Mark Present'} */}
      Remove Absence
    </AttendanceButton>
  )
}

import React, { FC, useEffect, useState } from 'react'
import {
  findStudentInfoByStudentId_findStudentById_student,
  findStudentInfoByStudentIdVariables,
} from '../../../../../schemaTypes'
import { AssessProtocol } from './protocols/AssessProtocol'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { QueryLazyOptions } from '@apollo/client'
import { DailyAttendance } from './attendance/DailyAttendance'
import {
  StudentControlPanelContainer,
  StudentControlButtonContainer,
  ControlButtons,
} from '../styles/studentInfoStyles'
import { DailyBehavior } from './behavior/DailyBehavior'

export type StudentControlPanelDisplayProps = {
  student: findStudentInfoByStudentId_findStudentById_student
  loadStudentInfo: (
    options?: QueryLazyOptions<findStudentInfoByStudentIdVariables> | undefined
  ) => void
  absenceCheck: boolean
}

export const StudentControlPanelDisplay: FC<StudentControlPanelDisplayProps> =
  ({ student, loadStudentInfo, absenceCheck }) => {
    const [state, event] = useTeachersAidContextProvider()
    const [controllerState, setControllerState] = useState<
      'ATTENDANCE' | 'BEHAVIOR'
    >('ATTENDANCE')

    useEffect(() => {
      if (student?.hasProtocols.some((protocol) => protocol.isActive)) {
        event({ type: 'ASSESS_PROTOCOL_DISPLAY' })
      }
    }, [student])

    const protocols = student?.hasProtocols

    return (
      <>
        {student?.hasProtocols.some((protocol) => protocol.isActive) ? (
          <AssessProtocol
            loadStudentInfo={loadStudentInfo}
            protocols={protocols}
            student={student}
          />
        ) : (
          <StudentControlPanelContainer>
            <StudentControlButtonContainer>
              {/* <ControlButtons onClick={() => setControllerState('ATTENDANCE')}>
                Attendance
              </ControlButtons>
              <ControlButtons onClick={() => setControllerState('BEHAVIOR')}>
                Behavior
              </ControlButtons> */}
            </StudentControlButtonContainer>
            {student && state.context.attendanceToggle && (
              <DailyAttendance student={student} absenceCheck={absenceCheck} />
            )}
            {student && !state.context.attendanceToggle && (
              <DailyBehavior studentId={student._id!} />
            )}
          </StudentControlPanelContainer>
        )}
      </>
    )
  }

import React, { FC, useEffect, useState } from 'react'
import {
  findStudentInfoByStudentId_findStudentById_student,
  findStudentInfoByStudentIdVariables,
  findStudentInfoByStudentId_findStudentById_student_hasBehaviors,
  MarkingPeriodEnum,
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
import { StudentStatus } from './status/StudentStatus'

export type StudentControlPanelDisplayProps = {
  student: findStudentInfoByStudentId_findStudentById_student
  loadStudentInfo: (
    options?: QueryLazyOptions<findStudentInfoByStudentIdVariables> | undefined
  ) => void
  absenceCheck: boolean
  grade: number
  gradeLoading: boolean
  studentBehaviors: findStudentInfoByStudentId_findStudentById_student_hasBehaviors[]
  markingPeriod: MarkingPeriodEnum
}

export const StudentControlPanelDisplay = ({
  student,
  loadStudentInfo,
  markingPeriod,
  absenceCheck,
  grade,
  gradeLoading,
  studentBehaviors,
}: StudentControlPanelDisplayProps) => {
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
      {!absenceCheck &&
      student?.hasProtocols.some((protocol) => protocol.isActive) ? (
        <AssessProtocol
          loadStudentInfo={loadStudentInfo}
          protocols={protocols}
          student={student}
          grade={grade}
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
          {student && state.context.studentInfoSelector === 'ATTENDANCE' && (
            <DailyAttendance student={student} absenceCheck={absenceCheck} />
          )}
          {student && state.context.studentInfoSelector === 'STATUS' && (
            <StudentStatus student={student} markingPeriod={markingPeriod} />
          )}
          {!absenceCheck &&
            student &&
            state.context.studentInfoSelector !== 'ATTENDANCE' && (
              <DailyBehavior
                studentId={student._id!}
                grade={grade}
                gradeLoading={gradeLoading}
                studentBehaviors={studentBehaviors}
              />
            )}
        </StudentControlPanelContainer>
      )}
    </>
  )
}

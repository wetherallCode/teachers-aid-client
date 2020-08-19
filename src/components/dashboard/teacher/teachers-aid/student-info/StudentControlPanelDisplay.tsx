import React, { FC, useEffect } from 'react'
import {
  findStudentInfoByStudentId_findStudentById_student,
  findStudentInfoByStudentIdVariables,
} from '../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { AssessProtocol } from './protocols/AssessProtocol'
import { useTeachersAidContextProvider } from '../state/TeachersAidContext'
import { QueryLazyOptions } from '@apollo/client'

export type StudentControlPanelDisplayProps = {
  student: findStudentInfoByStudentId_findStudentById_student
  loadStudentInfo: (
    options?: QueryLazyOptions<findStudentInfoByStudentIdVariables> | undefined
  ) => void
}

export const StudentControlPanelDisplay: FC<StudentControlPanelDisplayProps> = ({
  student,
  loadStudentInfo,
}) => {
  const [state, event] = useTeachersAidContextProvider()
  useEffect(() => {
    if (student?.hasProtocols.some((protocol) => protocol.isActive)) {
      event({ type: 'ASSESS_PROTOCOL_DISPLAY' })
    }
  }, [student])
  const protocols = student?.hasProtocols

  return (
    <>
      <div>Control</div>
      {student?.hasProtocols.some((protocol) => protocol.isActive) && (
        <AssessProtocol
          loadStudentInfo={loadStudentInfo}
          protocols={protocols}
          student={student}
        />
      )}
    </>
  )
}

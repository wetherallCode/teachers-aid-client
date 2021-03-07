import React from 'react'
import { TemporaryTaskDisplay } from '../courses/temporary-tasks/state-n-styles/temporaryTaskStyles'
import { AssignmentInformation } from './AssignmentInformation'
import { ParentContacts } from './ParentContacts'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'
import {
  InformationContainer,
  InformationTypeSelectorContainer,
  InformationTypeTab,
  StudentNameHeader,
} from './state-n-styles/studentInformationStyles'
import { TemporaryTasksInformation } from './TemporaryTasksInformation'

export type InformationDisplayProps = {}

export const InformationDisplay = ({}: InformationDisplayProps) => {
  const [state, event] = useStudentInformationContextProvider()
  const { student } = state.context
  return (
    <InformationContainer>
      <StudentNameHeader>
        <div>
          {student?.firstName} {student?.lastName}
        </div>
      </StudentNameHeader>
      <InformationTypeSelectorContainer>
        <InformationTypeTab
          onClick={() => event({ type: 'STUDENT_INFO' })}
          selected={state.matches('information.studentInfo')}
        >
          <div>Student Info</div>
        </InformationTypeTab>
        <InformationTypeTab
          onClick={() => event({ type: 'ASSIGNMENTS' })}
          selected={state.matches('information.assignments')}
        >
          <div>Assignments</div>
        </InformationTypeTab>
        <InformationTypeTab
          onClick={() => event({ type: 'PROTOCOLS' })}
          selected={state.matches('information.protocols')}
        >
          <div>Protocols</div>
        </InformationTypeTab>
        <InformationTypeTab
          onClick={() => event({ type: 'CONTACTS' })}
          selected={state.matches('information.contacts')}
        >
          <div>Contacts</div>
        </InformationTypeTab>
      </InformationTypeSelectorContainer>
      {state.matches('information.studentInfo') && <div>Student Info</div>}
      {state.matches('information.assignments') && (
        <AssignmentInformation studentId={student?._id!} />
      )}
      {state.matches('information.protocols') && <TemporaryTasksInformation />}
      {state.matches('information.contacts') && <ParentContacts />}
    </InformationContainer>
  )
}

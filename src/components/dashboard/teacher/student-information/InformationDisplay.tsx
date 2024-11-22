import React, { useState } from 'react'
import {
  findAllStudentsForStudentInformation,
  MarkingPeriodEnum,
} from '../../../../schemaTypes'
import { MarkingPeriodSelectorSwitch } from '../../../reusable-components/MarkingPeriodSelectorSwitch'
import { TemporaryTaskDisplay } from '../courses/temporary-tasks/state-n-styles/temporaryTaskStyles'
import { AssignmentInformation } from './assignments/AssignmentInformation'
import { ParentContacts } from './contact-info/ParentContacts'
import { useStudentInformationContextProvider } from './state-n-styles/StudentInformationContext'
import {
  InformationContainer,
  InformationTypeSelectorContainer,
  InformationTypeTab,
  MarkingPeriodSelectorSwitchContainer,
  StudentNameHeader,
} from './state-n-styles/studentInformationStyles'
import { StudentInformationDisplay } from './general-student-information/StudentInformationDisplay'
import { TemporaryTasksInformation } from './TemporaryTasksInformation'
import { ConductHome } from './conduct/ConductHome'

export type InformationDisplayProps = {}

export const InformationDisplay = ({}: InformationDisplayProps) => {
  const [state, event] = useStudentInformationContextProvider()
  const [selectedMarkingPeriod, setSelectedMarkingPeriod] = useState(
    MarkingPeriodEnum.FIRST,
  )
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
          <div>Student Data</div>
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
          onClick={() => event({ type: 'CONDUCT' })}
          selected={state.matches('information.conduct')}
        >
          <div>Conduct</div>
        </InformationTypeTab>
        <InformationTypeTab
          onClick={() => event({ type: 'CONTACTS' })}
          selected={state.matches('information.contacts')}
        >
          <div>Contacts</div>
        </InformationTypeTab>
      </InformationTypeSelectorContainer>
      {state.matches('information.studentInfo') && (
        <StudentInformationDisplay
          student={student!}
          selectedMarkingPeriod={selectedMarkingPeriod}
          setSelectedMarkingPeriod={setSelectedMarkingPeriod}
        />
      )}
      {state.matches('information.assignments') && (
        <AssignmentInformation
          studentId={student?._id!}
          selectedMarkingPeriod={selectedMarkingPeriod}
        />
      )}
      {state.matches('information.protocols') && <TemporaryTasksInformation />}
      {state.matches('information.conduct') && (
        <ConductHome
          studentId={student?._id!}
          selectedMarkingPeriod={selectedMarkingPeriod}
        />
      )}
      {state.matches('information.contacts') && (
        <ParentContacts studentId={student?._id!} />
      )}
      <MarkingPeriodSelectorSwitchContainer>
        <MarkingPeriodSelectorSwitch
          selectedMarkingPeriod={selectedMarkingPeriod}
          setSelectedMarkingPeriod={setSelectedMarkingPeriod}
        />
      </MarkingPeriodSelectorSwitchContainer>
    </InformationContainer>
  )
}

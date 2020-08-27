import React, { FC } from 'react'
import { AssignedEssaySelect } from './essays/assigned-essays/AssignedEssaySelect'
import { CompletedEssaySelect } from './essays/completed-essays/CompletedEssaySelect'
import { AssignedReadingGuideSelect } from './readingGuides/AssignedReadingGuideSelect'
import {
  AssignmentsToCompleteContainer,
  AssignmentsTypeSelectorPanel,
  AssignmentsTypeStyle,
  AssignmentsTypeSelectorHeader,
  AssignmentTypeContainer,
} from './assignmentsStyles'
import { useStudentAssignmentContextProvider } from './StudentAssignmentContext'

export type StudentAssignmentsProps = {}

export const StudentAssignments: FC<StudentAssignmentsProps> = () => {
  const [state, event] = useStudentAssignmentContextProvider()

  return (
    <AssignmentsToCompleteContainer>
      <AssignmentsTypeSelectorPanel>
        <AssignmentsTypeSelectorHeader>
          Assignments
        </AssignmentsTypeSelectorHeader>
        <AssignmentsTypeStyle
          onClick={() => event({ type: 'ESSAYS_TO_COMPLETE' })}
        >
          Essays to Complete
        </AssignmentsTypeStyle>
        <AssignmentsTypeStyle
          onClick={() => event({ type: 'COMPLETED_ESSAYS' })}
        >
          Completed Essays
        </AssignmentsTypeStyle>
        <AssignmentsTypeStyle onClick={() => event({ type: 'READING_GUIDES' })}>
          Reading Guides to Complete
        </AssignmentsTypeStyle>
      </AssignmentsTypeSelectorPanel>
      <AssignmentTypeContainer>
        {state.matches('essaysToComplete') && <AssignedEssaySelect />}
        {state.matches('completedEssays') && <CompletedEssaySelect />}
        {state.matches('readingGuidesToComplete') && (
          <AssignedReadingGuideSelect />
        )}
      </AssignmentTypeContainer>
    </AssignmentsToCompleteContainer>
  )
}

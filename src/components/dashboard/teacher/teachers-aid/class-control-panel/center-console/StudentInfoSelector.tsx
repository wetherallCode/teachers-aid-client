import React from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import {
  StudentInfoSelectorButton,
  StudentInfoSelectorContainer,
} from '../../styles/classControlPanelStyles'

export type StudentInfoSelectorProps = {}
export type StudentInfoSelectorTypes =
  | 'QUESTION_AND_ANSWER'
  | 'PREPAREDNESS'
  | 'NEGATIVE_BEHAVIOR'
  | 'ATTENDANCE'
  | 'TASK_CHECK'
  | 'INFO'
  | 'STATUS'

export const StudentInfoSelector = ({}: StudentInfoSelectorProps) => {
  const [state, event] = useTeachersAidContextProvider()

  const handleSelection = (selection: StudentInfoSelectorTypes) => {
    event({ type: 'SET_STUDENT_INFO_SELECTOR', payload: selection })
  }
  return (
    <StudentInfoSelectorContainer>
      <StudentInfoSelectorButton onClick={() => handleSelection('ATTENDANCE')}>
        A
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        onClick={() => handleSelection('PREPAREDNESS')}
      >
        P
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton onClick={() => handleSelection('STATUS')}>
        S
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        onClick={() => handleSelection('QUESTION_AND_ANSWER')}
      >
        Q&A
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        onClick={() => handleSelection('NEGATIVE_BEHAVIOR')}
      >
        -
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton onClick={() => handleSelection('TASK_CHECK')}>
        T
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton onClick={() => handleSelection('INFO')}>
        Info
      </StudentInfoSelectorButton>
    </StudentInfoSelectorContainer>
  )
}

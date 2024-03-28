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
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'ATTENDANCE'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('ATTENDANCE')}
      >
        A
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'PREPAREDNESS'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('PREPAREDNESS')}
      >
        P
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'STATUS'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('STATUS')}
      >
        S
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'QUESTION_AND_ANSWER'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('QUESTION_AND_ANSWER')}
      >
        Q&A
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'NEGATIVE_BEHAVIOR'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('NEGATIVE_BEHAVIOR')}
      >
        -
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'TASK_CHECK'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('TASK_CHECK')}
      >
        TA
      </StudentInfoSelectorButton>
      <StudentInfoSelectorButton
        style={
          state.context.studentInfoSelector === 'INFO'
            ? { background: 'var(--red)', color: 'var(--white)' }
            : {}
        }
        onClick={() => handleSelection('INFO')}
      >
        Info
      </StudentInfoSelectorButton>
    </StudentInfoSelectorContainer>
  )
}

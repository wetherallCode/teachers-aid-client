import React from 'react'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'

export type StudentInfoSelectorProps = {}
export type StudentInfoSelectorTypes =
  | 'QUESTION_AND_ANSWER'
  | 'NEGATIVE_BEHAVIOR'
  | 'ATTENDANCE'
  | 'TASK_CHECK'
  | 'INFO'

export const StudentInfoSelector = ({}: StudentInfoSelectorProps) => {
  const [state, event] = useTeachersAidContextProvider()

  const handleSelection = (selection: StudentInfoSelectorTypes) => {
    event({ type: 'SET_STUDENT_INFO_SELECTOR', payload: selection })
  }
  return (
    <div
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
        width: '90%',
        gridColumnGap: '15%',
      }}
    >
      <button onClick={() => handleSelection('ATTENDANCE')}>A</button>
      <button onClick={() => handleSelection('QUESTION_AND_ANSWER')}>
        Q&A
      </button>
      <button onClick={() => handleSelection('NEGATIVE_BEHAVIOR')}>-</button>
      <button onClick={() => handleSelection('TASK_CHECK')}>T</button>
      <button onClick={() => handleSelection('INFO')}>Info</button>
    </div>
  )
}

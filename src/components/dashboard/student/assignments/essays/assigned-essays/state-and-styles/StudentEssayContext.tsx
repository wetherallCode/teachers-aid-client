import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  studentEssayMachine,
  studentEssayMachineContext,
  studentEssayMachineEvent,
} from './studentEssayMachine'

const StudentEssayContext = createContext<any>(undefined)

type StudentEssayContextProps = {
  children: ReactNode
}

export const StudentEssayContextProvider: FC<StudentEssayContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(studentEssayMachine)
  return (
    <StudentEssayContext.Provider value={[state, event]}>
      {children}
    </StudentEssayContext.Provider>
  )
}

export function useStudentEssayContextProvider() {
  const context = useContext(StudentEssayContext)
  if (context === undefined) {
    throw new Error(
      'useStudentEssayContextProvider must be used within a StudentEssayContextProvider',
    )
  }
  return context as [
    State<studentEssayMachineContext, studentEssayMachineEvent, any, any>,
    (event: studentEssayMachineEvent) => void,
  ]
}

import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  studentAssignmentMachine,
  studentAssignmentMachineContext,
  studentAssignmentMachineEvent,
} from './studentAssignmentMachine'

const StudentAssignmentContext = createContext<any>(undefined)

type StudentAssignmentContextProps = {
  children: ReactNode
}

export const StudentAssignmentContextProvider: FC<
  StudentAssignmentContextProps
> = ({ children }) => {
  const [state, event] = useMachine(studentAssignmentMachine)
  return (
    <StudentAssignmentContext.Provider value={[state, event]}>
      {children}
    </StudentAssignmentContext.Provider>
  )
}

export function useStudentAssignmentContextProvider() {
  const context = useContext(StudentAssignmentContext)
  if (context === undefined) {
    throw new Error(
      'useStudentAssignmentContextProvider must be used within a StudentAssignmentContextProvider',
    )
  }
  return context as [
    State<
      studentAssignmentMachineContext,
      studentAssignmentMachineEvent,
      any,
      any
    >,
    (event: studentAssignmentMachineEvent) => void,
  ]
}

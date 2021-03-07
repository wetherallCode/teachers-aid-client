import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  studentInformationMachine,
  studentInformationMachineContext,
  studentInformationMachineEvent,
} from './studentInformationMachine'

const StudentInformationContext = createContext<any>(undefined)

type StudentInformationContextProps = {
  children: ReactNode
}

export const StudentInformationContextProvider: FC<StudentInformationContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(studentInformationMachine)
  return (
    <StudentInformationContext.Provider value={[state, event]}>
      {children}
    </StudentInformationContext.Provider>
  )
}

export function useStudentInformationContextProvider() {
  const context = useContext(StudentInformationContext)
  if (context === undefined) {
    throw new Error(
      'useStudentInformationContextProvider must be used within a StudentInformationContextProvider'
    )
  }
  return context as [
    State<
      studentInformationMachineContext,
      studentInformationMachineEvent,
      any,
      any
    >,
    (event: studentInformationMachineEvent) => void
  ]
}

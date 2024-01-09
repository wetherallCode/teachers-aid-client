import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  AssignmentManagerMachine,
  AssignmentManagerMachineContext,
  AssignmentManagerMachineEvent,
} from './AssignmentManagerMachine'

const AssignmentManagerContext = createContext<any>(undefined)

type AssignmentManagerContextProps = {
  children: ReactNode
}

export const AssignmentManagerContextProvider: FC<
  AssignmentManagerContextProps
> = ({ children }) => {
  const [state, event] = useMachine(AssignmentManagerMachine)
  return (
    <AssignmentManagerContext.Provider value={[state, event]}>
      {children}
    </AssignmentManagerContext.Provider>
  )
}

export function useAssignmentManagerContextProvider() {
  const context = useContext(AssignmentManagerContext)
  if (context === undefined) {
    throw new Error(
      'useAssignmentManagerContextProvider must be used within a AssignmentManagerContextProvider',
    )
  }
  return context as [
    State<
      AssignmentManagerMachineContext,
      AssignmentManagerMachineEvent,
      any,
      any
    >,
    (event: AssignmentManagerMachineEvent) => void,
  ]
}

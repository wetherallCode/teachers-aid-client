import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  assignSeatsMachine,
  assignSeatsMachineContext,
  assignSeatsMachineEvent,
} from './assignSeatsMachine'

const AssignSeatsContext = createContext<any>(undefined)

type AssignSeatsContextProps = {
  children: ReactNode
}

export const AssignSeatsContextProvider: FC<AssignSeatsContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(assignSeatsMachine)
  return (
    <AssignSeatsContext.Provider value={[state, event]}>
      {children}
    </AssignSeatsContext.Provider>
  )
}

export function useAssignSeatsContextProvider() {
  const context = useContext(AssignSeatsContext)
  if (context === undefined) {
    throw new Error(
      'useAssignSeatsContextProvider must be used within a AssignSeatsContextProvider'
    )
  }
  return context as [
    State<assignSeatsMachineContext, assignSeatsMachineEvent, any, any>,
    (event: assignSeatsMachineEvent) => void
  ]
}

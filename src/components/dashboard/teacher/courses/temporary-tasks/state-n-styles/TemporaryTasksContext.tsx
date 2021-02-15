import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  temporaryTasksMachine,
  temporaryTasksMachineContext,
  temporaryTasksMachineEvent,
} from './temporaryTasksMachine'

const TemporaryTasksContext = createContext<any>(undefined)

type TemporaryTasksContextProps = {
  children: ReactNode
}

export const TemporaryTasksContextProvider: FC<TemporaryTasksContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(temporaryTasksMachine)
  return (
    <TemporaryTasksContext.Provider value={[state, event]}>
      {children}
    </TemporaryTasksContext.Provider>
  )
}

export function useTemporaryTasksContextProvider() {
  const context = useContext(TemporaryTasksContext)
  if (context === undefined) {
    throw new Error(
      'useTemporaryTasksContextProvider must be used within a TemporaryTasksContextProvider'
    )
  }
  return context as [
    State<temporaryTasksMachineContext, temporaryTasksMachineEvent, any, any>,
    (event: temporaryTasksMachineEvent) => void
  ]
}

import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  completedEssayMachine,
  completedEssayMachineContext,
  completedEssayMachineEvent,
} from './completedEssayMachine'

const CompletedEssayContext = createContext<any>(undefined)

type CompletedEssayContextProps = {
  children: ReactNode
}

export const CompletedEssayContextProvider: FC<CompletedEssayContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(completedEssayMachine)
  return (
    <CompletedEssayContext.Provider value={[state, event]}>
      {children}
    </CompletedEssayContext.Provider>
  )
}

export function useCompletedEssayContextProvider() {
  const context = useContext(CompletedEssayContext)
  if (context === undefined) {
    throw new Error(
      'useCompletedEssayContextProvider must be used within a CompletedEssayContextProvider',
    )
  }
  return context as [
    State<completedEssayMachineContext, completedEssayMachineEvent, any, any>,
    (event: completedEssayMachineEvent) => void,
  ]
}

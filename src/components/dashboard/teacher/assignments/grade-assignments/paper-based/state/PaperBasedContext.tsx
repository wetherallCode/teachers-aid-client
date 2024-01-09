import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  paperBasedMachine,
  paperBasedMachineContext,
  paperBasedMachineEvent,
} from './paperBasedMachine'

const PaperBasedContext = createContext<any>(undefined)

type PaperBasedContextProps = {
  children: ReactNode
}

export const PaperBasedContextProvider: FC<PaperBasedContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(paperBasedMachine)
  return (
    <PaperBasedContext.Provider value={[state, event]}>
      {children}
    </PaperBasedContext.Provider>
  )
}

export function usePaperBasedContextProvider() {
  const context = useContext(PaperBasedContext)
  if (context === undefined) {
    throw new Error(
      'usePaperBasedContextProvider must be used within a PaperBasedContextProvider',
    )
  }
  return context as [
    State<paperBasedMachineContext, paperBasedMachineEvent, any, any>,
    (event: paperBasedMachineEvent) => void,
  ]
}

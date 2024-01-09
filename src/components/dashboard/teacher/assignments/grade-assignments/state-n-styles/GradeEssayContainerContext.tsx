import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  gradeEssayContainerMachine,
  gradeEssayContainerMachineContext,
  gradeEssayContainerMachineEvent,
} from './gradeEssayContainerMachine'

const GradeEssayContainerContext = createContext<any>(undefined)

type GradeEssayContainerContextProps = {
  children: ReactNode
}

export const GradeEssayContainerContextProvider: FC<
  GradeEssayContainerContextProps
> = ({ children }) => {
  const [state, event] = useMachine(gradeEssayContainerMachine)
  return (
    <GradeEssayContainerContext.Provider value={[state, event]}>
      {children}
    </GradeEssayContainerContext.Provider>
  )
}

export function useGradeEssayContainerContextProvider() {
  const context = useContext(GradeEssayContainerContext)
  if (context === undefined) {
    throw new Error(
      'useGradeEssayContainerContextProvider must be used within a GradeEssayContainerContextProvider',
    )
  }
  return context as [
    State<
      gradeEssayContainerMachineContext,
      gradeEssayContainerMachineEvent,
      any,
      any
    >,
    (event: gradeEssayContainerMachineEvent) => void,
  ]
}

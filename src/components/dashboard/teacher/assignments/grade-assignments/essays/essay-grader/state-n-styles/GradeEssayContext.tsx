import React, { FC, createContext, ReactNode, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  gradeEssayMachine,
  gradeEssayMachineContext,
  gradeEssayMachineEvent,
} from './gradeEssayMachine'

export type GradeEssayContextProps = {
  children: ReactNode
}

const GradeEssayContext = createContext<any>(undefined)

export const GradeEssayContextProvider: FC<GradeEssayContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(gradeEssayMachine)
  return (
    <GradeEssayContext.Provider value={[state, event]}>
      {children}
    </GradeEssayContext.Provider>
  )
}

export function useGradeEssayContextProvider() {
  const context = useContext(GradeEssayContext)
  if (context === undefined) {
    throw new Error(
      'useGradeEssayContextProvider must be used within a GradeEssayContextProvider',
    )
  }
  return context as [
    State<gradeEssayMachineContext, gradeEssayMachineEvent, any, any>,
    (event: gradeEssayMachineEvent) => void,
  ]
}

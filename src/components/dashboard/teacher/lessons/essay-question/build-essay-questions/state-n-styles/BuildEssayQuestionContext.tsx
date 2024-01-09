import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  buildEssayQuestionMachine,
  buildEssayQuestionMachineContext,
  buildEssayQuestionMachineEvent,
} from './buildEssayQuestionMachine'

const BuildEssayQuestionContext = createContext<any>(undefined)

type BuildEssayQuestionContextProps = {
  children: ReactNode
}

export const BuildEssayQuestionContextProvider: FC<
  BuildEssayQuestionContextProps
> = ({ children }) => {
  const [state, event] = useMachine(buildEssayQuestionMachine)
  return (
    <BuildEssayQuestionContext.Provider value={[state, event]}>
      {children}
    </BuildEssayQuestionContext.Provider>
  )
}

export function useBuildEssayQuestionContextProvider() {
  const context = useContext(BuildEssayQuestionContext)
  if (context === undefined) {
    throw new Error(
      'useBuildEssayQuestionContextProvider must be used within a BuildEssayQuestionContextProvider',
    )
  }
  return context as [
    State<
      buildEssayQuestionMachineContext,
      buildEssayQuestionMachineEvent,
      any,
      any
    >,
    (event: buildEssayQuestionMachineEvent) => void,
  ]
}

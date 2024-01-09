import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  readingGuideToCompleteMachine,
  readingGuideToCompleteMachineContext,
  readingGuideToCompleteMachineEvent,
} from './readingGuideToCompleteMachine'

const ReadingGuideToCompleteContext = createContext<any>(undefined)

type ReadingGuideToCompleteContextProps = {
  children: ReactNode
}

export const ReadingGuideToCompleteContextProvider: FC<
  ReadingGuideToCompleteContextProps
> = ({ children }) => {
  const [state, event] = useMachine(readingGuideToCompleteMachine)
  return (
    <ReadingGuideToCompleteContext.Provider value={[state, event]}>
      {children}
    </ReadingGuideToCompleteContext.Provider>
  )
}

export function useReadingGuideToCompleteContextProvider() {
  const context = useContext(ReadingGuideToCompleteContext)
  if (context === undefined) {
    throw new Error(
      'useReadingGuideToCompleteContextProvider must be used within a ReadingGuideToCompleteContextProvider',
    )
  }
  return context as [
    State<
      readingGuideToCompleteMachineContext,
      readingGuideToCompleteMachineEvent,
      any,
      any
    >,
    (event: readingGuideToCompleteMachineEvent) => void,
  ]
}

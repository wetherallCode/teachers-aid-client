import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  quizToCompleteMachine,
  quizToCompleteMachineContext,
  quizToCompleteMachineEvent,
} from './quizToCompleteMachine'

const QuizToCompleteContext = createContext<any>(undefined)

type QuizToCompleteContextProps = {
  children: ReactNode
}

export const QuizToCompleteContextProvider = ({
  children,
}: QuizToCompleteContextProps) => {
  const [state, event] = useMachine(quizToCompleteMachine)
  return (
    <QuizToCompleteContext.Provider value={[state, event]}>
      {children}
    </QuizToCompleteContext.Provider>
  )
}

export function useQuizToCompleteContextProvider() {
  const context = useContext(QuizToCompleteContext)
  if (context === undefined) {
    throw new Error(
      'useQuizToCompleteContextProvider must be used within a QuizToCompleteContextProvider'
    )
  }
  return context as [
    State<quizToCompleteMachineContext, quizToCompleteMachineEvent, any, any>,
    (event: quizToCompleteMachineEvent) => void
  ]
}

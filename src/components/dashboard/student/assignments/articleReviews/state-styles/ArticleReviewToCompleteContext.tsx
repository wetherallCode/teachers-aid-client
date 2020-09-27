import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  articleReviewToCompleteMachine,
  articleReviewToCompleteMachineContext,
  articleReviewToCompleteMachineEvent,
} from './articleReviewToCompleteMachine'

const ArticleReviewToCompleteContext = createContext<any>(undefined)

type ArticleReviewToCompleteContextProps = {
  children: ReactNode
}

export const ArticleReviewToCompleteContextProvider: FC<ArticleReviewToCompleteContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(articleReviewToCompleteMachine)
  return (
    <ArticleReviewToCompleteContext.Provider value={[state, event]}>
      {children}
    </ArticleReviewToCompleteContext.Provider>
  )
}

export function useArticleReviewToCompleteContextProvider() {
  const context = useContext(ArticleReviewToCompleteContext)
  if (context === undefined) {
    throw new Error(
      'useArticleReviewToCompleteContextProvider must be used within a ArticleReviewToCompleteContextProvider'
    )
  }
  return context as [
    State<
      articleReviewToCompleteMachineContext,
      articleReviewToCompleteMachineEvent,
      any,
      any
    >,
    (event: articleReviewToCompleteMachineEvent) => void
  ]
}

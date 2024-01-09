import React, { createContext, ReactNode, FC, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { State } from 'xstate'
import {
  articleReviewMachine,
  articleReviewMachineContext,
  articleReviewMachineEvent,
} from './articleReviewMachine'

const ArticleReviewContext = createContext<any>(undefined)

type ArticleReviewContextProps = {
  children: ReactNode
}

export const ArticleReviewContextProvider: FC<ArticleReviewContextProps> = ({
  children,
}) => {
  const [state, event] = useMachine(articleReviewMachine)
  return (
    <ArticleReviewContext.Provider value={[state, event]}>
      {children}
    </ArticleReviewContext.Provider>
  )
}

export function useArticleReviewContextProvider() {
  const context = useContext(ArticleReviewContext)
  if (context === undefined) {
    throw new Error(
      'useArticleReviewContextProvider must be used within a ArticleReviewContextProvider',
    )
  }
  return context as [
    State<articleReviewMachineContext, articleReviewMachineEvent, any, any>,
    (event: articleReviewMachineEvent) => void,
  ]
}

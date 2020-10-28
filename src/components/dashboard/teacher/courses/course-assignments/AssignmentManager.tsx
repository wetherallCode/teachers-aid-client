import React, { FC } from 'react'
import { ArticleReviews } from './downloadables/article-reviews/ArticleReviews'
import { Essays } from './downloadables/essays/Essays'
import { ResponsibilityPoints } from './downloadables/responsibility-points/ResponsibilityPoints'
import { useAssignmentManagerContextProvider } from './state-styles/AssignmentManagerContext'

export type AssignmentManagerProps = {}

export const AssignmentManager: FC<AssignmentManagerProps> = () => {
  const [state, event] = useAssignmentManagerContextProvider()
  return (
    <>
      <div>Assignment Manager</div>
      <div>Create Grade Download</div>
      <div>
        <div onClick={() => event({ type: 'RESPONSIBILITY_POINTS' })}>
          Responsibility Points
        </div>
        <div onClick={() => event({ type: 'ESSAYS' })}>Essays</div>
        <div onClick={() => event({ type: 'ARTICLE_REVIEW' })}>
          Article Reviews
        </div>
      </div>
      {state.matches('responsibilityPoints') && <ResponsibilityPoints />}
      {state.matches('essays') && <Essays />}
      {state.matches('articleReviews') && <ArticleReviews />}
    </>
  )
}

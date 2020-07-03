import React, { FC } from 'react'
import { findCompletedEssayById_findEssayById_essay } from '../../../../../../schemaTypes'

export type CompletedEssayViewerProps = {
  essay: findCompletedEssayById_findEssayById_essay
}

export const CompletedEssayViewer: FC<CompletedEssayViewerProps> = ({
  essay,
}) => {
  const [parsedEssay] = JSON.parse(essay.finalDraft?.submittedFinalDraft.draft)
  const text = parsedEssay.children[0].text
  return (
    <>
      <div>{text}</div>{' '}
    </>
  )
}

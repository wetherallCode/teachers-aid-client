import React, { FC } from 'react'
import {
  EssaySheet,
  EssayEditorContainer,
} from '../assigned-essays/state-and-styles/assignedEssayStyles'
import { CompletedEssayContainer } from './state/completedEssayStyles'

export type CompletedEssayViewerProps = {
  draft: string
}

export const CompletedEssayViewer: FC<CompletedEssayViewerProps> = ({
  draft,
}) => {
  const [parsedEssay] = JSON.parse(draft)
  const text = parsedEssay.children[0].text
  return (
    <>
      <EssaySheet>{text}</EssaySheet>
    </>
  )
}

import React from 'react'
import { EssayQuestionBuilder } from './build-essay-questions/EssayQuestionBuilder'

export type QuestionsProps = {}

export const Questions = ({}: QuestionsProps) => {
  return (
    <>
      <EssayQuestionBuilder />
    </>
  )
}

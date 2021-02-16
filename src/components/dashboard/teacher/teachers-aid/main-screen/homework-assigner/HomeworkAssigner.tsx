import React, { FC } from 'react'
import { LoadEssays } from './assign-essay/LoadEssays'
import { LoadReadingGuides } from './assign-reading-guide/LoadReadingGuides'

export type HomeworkAssignerProps = {}

export const HomeworkAssigner: FC<HomeworkAssignerProps> = () => {
  return (
    <>
      <div>Homework</div>
      <LoadEssays />
      <LoadReadingGuides />
    </>
  )
}

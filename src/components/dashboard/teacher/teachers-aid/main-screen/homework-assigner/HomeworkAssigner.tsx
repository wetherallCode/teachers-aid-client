import React, { FC } from 'react'
import {
  HomeworkAssignerTitleContainer,
  HomeworkAssingerContainer,
} from '../../styles/mainScreenStyles'
import { LoadEssays } from './assign-essay/LoadEssays'
import { LoadReadingGuides } from './assign-reading-guide/LoadReadingGuides'

export type HomeworkAssignerProps = {}

export const HomeworkAssigner: FC<HomeworkAssignerProps> = () => {
  return (
    <HomeworkAssingerContainer>
      <HomeworkAssignerTitleContainer>Homework</HomeworkAssignerTitleContainer>
      <LoadEssays />
      <LoadReadingGuides />
    </HomeworkAssingerContainer>
  )
}

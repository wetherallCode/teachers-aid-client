import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'

export type DevelopingGradingToolProps = {}

export const DevelopingGradingTool: FC<DevelopingGradingToolProps> = () => {
  const [state, event] = useGradeEssayContextProvider()
  return (
    <>
      <div>Developing Rubric</div>
    </>
  )
}

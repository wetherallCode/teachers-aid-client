import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'

export type AdvancedGradingToolProps = {}

export const AdvancedGradingTool: FC<AdvancedGradingToolProps> = () => {
  const [state, event] = useGradeEssayContextProvider()
  return (
    <>
      <div>Advanced Rubric</div>
    </>
  )
}

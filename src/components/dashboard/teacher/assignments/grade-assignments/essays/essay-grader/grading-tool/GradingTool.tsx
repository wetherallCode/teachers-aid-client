import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'
import { DevelopingGradingTool } from './DevelopingGradingTool'
import { AcademicGradingTool } from './AcademicGradingTool'
import { AdvancedGradingTool } from './AdvancedGradingTool'
import { useQuery } from '@apollo/client'
import { FIND_RUBRIC_ENTRIES } from '../../../../../rubrics/rubric-editor/select-entry/SelectEntry'
import { findRubricEntries } from '../../../../../../../../schemaTypes'

export type GradingToolProps = {}

export const GradingTool: FC<GradingToolProps> = () => {
  const [state] = useGradeEssayContextProvider()

  const { loading, data } = useQuery<findRubricEntries>(FIND_RUBRIC_ENTRIES, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const rubric = data?.findRubricEntries.rubricEntries!

  return (
    <>
      {state.context.writingLevel === 'DEVELOPING' && (
        <DevelopingGradingTool rubricEntries={rubric} />
      )}
      {state.context.writingLevel === 'ACADEMIC' && (
        <AcademicGradingTool rubricEntries={rubric} />
      )}
      {state.context.writingLevel === 'ADVANCED' && (
        <AdvancedGradingTool rubricEntries={rubric} />
      )}
    </>
  )
}

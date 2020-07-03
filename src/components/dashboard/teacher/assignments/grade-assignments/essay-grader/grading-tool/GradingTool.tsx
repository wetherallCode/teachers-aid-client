import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'
import { DevelopingGradingTool } from './DevelopingGradingTool'
import { AcademicGradingTool } from './AcademicGradingTool'
import { AdvancedGradingTool } from './AdvancedGradingTool'
import { useQuery } from '@apollo/client'
import { FIND_RUBRIC_ENTRIES } from '../../../../rubrics/rubric-editor/select-entry/SelectEntry'
import { findRubricEntries } from '../../../../../../../schemaTypes'

export type GradingToolProps = {}

export const GradingTool: FC<GradingToolProps> = () => {
  const [state] = useGradeEssayContextProvider()

  const { loading, data } = useQuery<findRubricEntries>(FIND_RUBRIC_ENTRIES, {
    // onCompleted: (data) => console.log(data.findRubricEntries.rubricEntries),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const rubric = data?.findRubricEntries.rubricEntries!

  return (
    <>
      {state.matches('grading.developing') && (
        <DevelopingGradingTool rubricEntries={rubric} />
      )}
      {state.matches('grading.academic') && (
        <AcademicGradingTool rubricEntries={rubric} />
      )}
      {state.matches('grading.advanced') && (
        <AdvancedGradingTool rubricEntries={rubric} />
      )}
    </>
  )
}

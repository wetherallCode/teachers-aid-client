import React, { FC } from 'react'
import { useGradeEssayContextProvider } from '../state-n-styles/GradeEssayContext'
import { DevelopingGradingTool } from './DevelopingGradingTool'
import { AcademicGradingTool } from './AcademicGradingTool'
import { AdvancedGradingTool } from './AdvancedGradingTool'
import { useQuery } from '@apollo/client'
import { FIND_RUBRIC_ENTRIES } from '../../../../../rubrics/rubric-editor/select-entry/SelectEntry'
import {
  findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer,
  findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer,
  findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer,
  findRubricEntries,
} from '../../../../../../../../schemaTypes'
import { GradingToolContainer } from '../state-n-styles/EssaysToGradeStyles'

export type GradingToolProps = {
  organizer:
    | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer
    | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AcademicOrganizer
    | findEssayToGradeById_findEssayById_essay_workingDraft_organizer_AdvancedOrganizer
}

export const GradingTool: FC<GradingToolProps> = ({ organizer }) => {
  const [state] = useGradeEssayContextProvider()

  const { loading, data } = useQuery<findRubricEntries>(FIND_RUBRIC_ENTRIES, {
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const rubric = data?.findRubricEntries.rubricEntries!
  // const developingOrganizer =
  //   organizer.__typename === 'DevelopingOrganizer' && organizer
  return (
    <GradingToolContainer>
      {state.context.writingLevel === 'DEVELOPING' && (
        <DevelopingGradingTool
          rubricEntries={rubric}
          // organizer={organizer}
        />
      )}
      {state.context.writingLevel === 'ACADEMIC' && (
        <AcademicGradingTool rubricEntries={rubric} />
      )}
      {state.context.writingLevel === 'ADVANCED' && (
        <AdvancedGradingTool rubricEntries={rubric} />
      )}
    </GradingToolContainer>
  )
}

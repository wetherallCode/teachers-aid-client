import React, { FC, useState, useEffect } from 'react'
import { useGradeEssayContextProvider } from '../state-n-styles/GradeEssayContext'
import {
  findRubricEntries_findRubricEntries_rubricEntries,
  WritingLevelEnum,
  ReturnedRubricEntryInput,
} from '../../../../../../../../schemaTypes'
import { useCheckBox } from '../../../../../../../../hooks/useCheckBox'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { AdditionalComments } from './AdditionalComments'
import {
  RubricContainer,
  AdditionalCommentsContainer,
  RubricCheckBoxContainer,
  RubricCheckBoxInput,
  RubricSectionEnumContainer,
  RubricTypeTitle,
} from '../state-n-styles/EssaysToGradeStyles'
import { sortByRubricEntryScore } from '../../../../../../../../utils'
import CheckBox from '../../../../../../../reusable-components/CheckBox'

export type AcademicGradingToolProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
}

export const AcademicGradingTool: FC<AcademicGradingToolProps> = ({
  rubricEntries,
}) => {
  const [state, event] = useGradeEssayContextProvider()
  const { rubricSectionEnum } = useEnumContextProvider()
  const [sectionSelector, setSectionSelector] = useState(0)
  const [rubricList, handleChange] = useCheckBox([])
  const rubricEntriesList: ReturnedRubricEntryInput[] = []

  rubricList.forEach((entry: string) => {
    const splitValues = entry.split(',')

    const rubricEntryValues: ReturnedRubricEntryInput = {
      entry: splitValues[0],
      rubricSection: state.context.currentRubricSection,
      score: Number(splitValues[1]),
      howToImprove: splitValues[2],
    }
    rubricEntriesList.push(rubricEntryValues)
  })

  const totalScore = rubricEntriesList
    .map((entry) => entry.score)
    .reduce((a, b) => a + b, 0)
  const averageScore =
    rubricEntriesList.length > 0 ? totalScore / rubricEntriesList.length : 0

  useEffect(() => {
    event({ type: 'SET_RUBRIC_ENTRIES', payload: rubricEntriesList })
    event({
      type: 'SET_SCORE',
      payload: Number(averageScore.toFixed(2)),
    })
  }, [rubricList, averageScore])

  useEffect(() => {
    event({
      type: 'SET_CURRENT_RUBRIC_SECTION',
      payload: rubricSectionEnum[sectionSelector],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelector, rubricSectionEnum])

  return (
    <>
      <RubricContainer>
        <RubricTypeTitle>
          <div>Academic Rubric</div>
        </RubricTypeTitle>
        <RubricSectionEnumContainer>
          <div
            onClick={(e: any) => {
              if (
                rubricSectionEnum.indexOf(state.context.currentRubricSection) >
                0
              ) {
                setSectionSelector(sectionSelector - 1)
              }
            }}
          >
            &lt;
          </div>
          <span>{state.context.currentRubricSection}</span>
          <div
            onClick={(e: any) => {
              if (
                rubricSectionEnum.indexOf(state.context.currentRubricSection) <
                rubricSectionEnum.length - 1
              ) {
                setSectionSelector(sectionSelector + 1)
              }
            }}
          >
            &gt;
          </div>
        </RubricSectionEnumContainer>

        <RubricCheckBoxContainer>
          {rubricEntries
            .filter(
              (entry) =>
                entry.rubricWritingLevels.includes(WritingLevelEnum.ACADEMIC) &&
                entry.rubricSection === state.context.currentRubricSection
            )
            .sort(sortByRubricEntryScore)
            .map((entry) => (
              // <div key={entry._id!}>
              // <RubricCheckBoxInput
              //   type='checkbox'
              //   checked={state.context.draftToGrade.rubricEntries.some(
              //     (entries) => entries.entry === entry.entry
              //   )}
              //   value={[
              //     entry.entry,
              //     entry.score.toString(),
              //     entry.howToImprove!,
              //   ]}
              //   onChange={handleChange}
              // />
              // <span>{entry.entry}</span>
              // </div>
              <CheckBox
                key={entry._id}
                checked={state.context.draftToGrade.rubricEntries.some(
                  (entries) => entries.entry === entry.entry
                )}
                onChange={handleChange}
                label={entry.entry}
                labelWidth={100}
                leftMargin={5}
                boxHeight={22}
                boxWidth={22}
                value={[
                  entry.entry,
                  entry.score.toString(),
                  entry.howToImprove!,
                ]}
              />
            ))}
        </RubricCheckBoxContainer>
      </RubricContainer>
      <AdditionalComments />
    </>
  )
}

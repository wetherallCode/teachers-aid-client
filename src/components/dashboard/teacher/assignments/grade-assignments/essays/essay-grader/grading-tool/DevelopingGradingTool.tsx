import React, { FC, useState, useEffect } from 'react'
import { useGradeEssayContextProvider } from '../state-n-styles/GradeEssayContext'
import {
  findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer,
  findRubricEntries_findRubricEntries_rubricEntries,
  ReturnedRubricEntryInput,
  RubricEntryInput,
  RubricSectionEnum,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../../../hooks/useCheckBox'
import { AdditionalComments } from './AdditionalComments'
import {
  AdditionalCommentsContainer,
  RubricCheckBoxContainer,
  RubricCheckBoxInput,
  RubricContainer,
  RubricSectionEnumContainer,
  RubricTypeTitle,
} from '../state-n-styles/EssaysToGradeStyles'
import { sortByRubricEntryScore } from '../../../../../../../../utils'
import CheckBox from '../../../../../../../reusable-components/CheckBox'

export type DevelopingGradingToolProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
  organizer?: findEssayToGradeById_findEssayById_essay_workingDraft_organizer_DevelopingOrganizer
}

export const DevelopingGradingTool: FC<DevelopingGradingToolProps> = ({
  rubricEntries,
}) => {
  const [state, event] = useGradeEssayContextProvider()
  const { rubricSectionEnum } = useEnumContextProvider()
  const [sectionSelector, setSectionSelector] = useState(0)
  const [rubricList, handleChange] = useCheckBox([])
  const rubricEntriesList: ReturnedRubricEntryInput[] = []

  const modifiedRubricSections = rubricSectionEnum
    .slice(2)
    .concat(rubricSectionEnum.slice(0, 2))

  rubricList.forEach((entry: string) => {
    const splitValues = entry.split(',')

    const rubricEntryValues: ReturnedRubricEntryInput = {
      entry: splitValues[0],
      rubricSection: splitValues[3] as RubricSectionEnum,
      score: Number(splitValues[1]),
      howToImprove: splitValues[2],
    }
    rubricEntriesList.push(rubricEntryValues)
  })

  const totalScore = rubricEntriesList
    .map((entry) => entry.score)
    .reduce((a, b) => a + b, 0)
  const averageScore = totalScore / rubricEntriesList.length

  useEffect(() => {
    event({ type: 'SET_RUBRIC_ENTRIES', payload: rubricEntriesList })
    if (averageScore) {
      event({
        type: 'SET_SCORE',
        payload: Number(averageScore.toFixed(2)),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rubricList])

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
          <div>Developing Rubric</div>
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

          <div>{state.context.currentRubricSection}</div>
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
                entry.rubricWritingLevels.includes(
                  WritingLevelEnum.DEVELOPING
                ) && entry.rubricSection === state.context.currentRubricSection
            )
            .sort(sortByRubricEntryScore)
            .map((entry) => {
              return (
                <CheckBox
                  key={entry._id}
                  checked={state.context.draftToGrade.rubricEntries.some(
                    (entries) => entries.entry === entry.entry
                  )}
                  onChange={handleChange}
                  label={entry.entry}
                  labelWidth={100}
                  leftMargin={1}
                  boxHeight={22}
                  boxWidth={22}
                  value={[
                    entry.entry,
                    entry.score.toString(),
                    entry.howToImprove!,
                    entry.rubricSection,
                  ]}
                />
              )
            })}
        </RubricCheckBoxContainer>
      </RubricContainer>
      <AdditionalComments />
    </>
  )
}

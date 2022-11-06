import React, { FC, useState, useEffect } from 'react'
import { useGradeEssayContextProvider } from '../state-n-styles/GradeEssayContext'
import {
  findRubricEntries_findRubricEntries_rubricEntries,
  WritingLevelEnum,
  ReturnedRubricEntryInput,
  RubricSectionEnum,
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
import {
  capitalizer,
  sortByRubricEntryScore,
} from '../../../../../../../../utils'
import CheckBox from '../../../../../../../reusable-components/CheckBox'
import { createPortal } from 'react-dom'
import { useToggle } from '../../../../../../../../hooks'

export type AcademicGradingToolProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
}

export const AcademicGradingTool = ({
  rubricEntries,
}: AcademicGradingToolProps) => {
  const [state, event] = useGradeEssayContextProvider()
  const [automaticZero, toggleAutomaticZero] = useState(false)
  const { rubricSectionEnum } = useEnumContextProvider()
  const [sectionSelector, setSectionSelector] = useState(0)
  const [rubricList, handleChange] = useCheckBox([])
  const rubricEntriesList: ReturnedRubricEntryInput[] = []

  const topicEntriesList: ReturnedRubricEntryInput[] = []
  const answerEntriesList: ReturnedRubricEntryInput[] = []
  const conclusionEntriesList: ReturnedRubricEntryInput[] = []
  const overallEntriesList: ReturnedRubricEntryInput[] = []
  const proofreadingEntriesList: ReturnedRubricEntryInput[] = []

  rubricList.forEach((entry: string) => {
    const splitValues = entry.split(',')

    const rubricEntryValues: ReturnedRubricEntryInput = {
      entry: splitValues[0],
      rubricSection: splitValues[3] as RubricSectionEnum,
      score: Number(splitValues[1]),
      howToImprove: splitValues[2],
    }
    rubricEntriesList.push(rubricEntryValues)

    if (splitValues[3] === RubricSectionEnum.TOPIC) {
      topicEntriesList.push(rubricEntryValues)
    }
    if (splitValues[3] === RubricSectionEnum.ANSWER) {
      answerEntriesList.push(rubricEntryValues)
    }
    if (splitValues[3] === RubricSectionEnum.CONCLUSION) {
      conclusionEntriesList.push(rubricEntryValues)
    }
    if (splitValues[3] === RubricSectionEnum.OVERALL) {
      overallEntriesList.push(rubricEntryValues)
    }
    if (splitValues[3] === RubricSectionEnum.PROOFREADING) {
      proofreadingEntriesList.push(rubricEntryValues)
    }
  })

  useEffect(() => {
    if (overallEntriesList.find((entry) => entry.score === 0)) {
      if (!automaticZero) {
        toggleAutomaticZero(true)
      }
    } else toggleAutomaticZero(false)
  }, [overallEntriesList, automaticZero])

  const topicScore =
    topicEntriesList.length > 0
      ? topicEntriesList
          .map((entry) => entry.score)
          .reduce((a, b) => a + b, 0) / topicEntriesList.length
      : 0

  const answerScore =
    answerEntriesList.length > 0
      ? answerEntriesList
          .map((entry) => entry.score)
          .reduce((a, b) => a + b, 0) / answerEntriesList.length
      : 0

  const conclusionScore =
    conclusionEntriesList.length > 0
      ? conclusionEntriesList
          .map((entry) => entry.score)
          .reduce((a, b) => a + b, 0) / conclusionEntriesList.length
      : 0

  const overallScore = overallEntriesList
    .map((entry) => entry.score)
    .reduce((a, b) => a + b, 0)

  const proofreadingScore = proofreadingEntriesList
    .map((entry) => entry.score)
    .reduce((a, b) => a + b, 0)

  const scoreBelowZero =
    topicScore * 0.1 +
      answerScore * 0.6 +
      conclusionScore * 0.3 -
      overallScore * 0.1 -
      proofreadingScore * 0.2 <
    0

  const weightedScore =
    scoreBelowZero || automaticZero
      ? 0
      : topicScore * 0.1 +
        answerScore * 0.5 +
        conclusionScore * 0.4 -
        overallScore * 0.1 -
        proofreadingScore * 0.2

  const totalScore = rubricEntriesList
    .map((entry) => entry.score)
    .reduce((a, b) => a + b, 0)

  const averageScore =
    rubricEntriesList.length > 0 ? totalScore / rubricEntriesList.length : 0

  useEffect(() => {
    event({ type: 'SET_RUBRIC_ENTRIES', payload: rubricEntriesList })
    event({
      type: 'SET_SCORE',
      payload: Number(weightedScore.toFixed(2)),
    })
  }, [rubricList, weightedScore])

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
          <span>{capitalizer(state.context.currentRubricSection)}</span>
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
                fontWeight={300}
                value={[
                  entry.entry,
                  entry.score.toString(),
                  entry.howToImprove!,
                  entry.rubricSection,
                ]}
              />
            ))}
        </RubricCheckBoxContainer>
      </RubricContainer>
      <AdditionalComments />
    </>
  )
}

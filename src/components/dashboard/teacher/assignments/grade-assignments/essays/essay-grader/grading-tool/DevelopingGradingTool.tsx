import React, { FC, useState, useEffect } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'
import {
  findRubricEntries_findRubricEntries_rubricEntries,
  ReturnedRubricEntryInput,
  WritingLevelEnum,
} from '../../../../../../../../schemaTypes'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../../../hooks/useCheckBox'
import { AdditionalComments } from './AdditionalComments'

export type DevelopingGradingToolProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
}

export const DevelopingGradingTool: FC<DevelopingGradingToolProps> = ({
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
  console.log(state.context.draftToGrade.rubricEntries)
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
      <div>Developing Rubric</div>

      <>
        <button
          onClick={(e: any) => {
            if (
              rubricSectionEnum.indexOf(state.context.currentRubricSection) > 0
            ) {
              setSectionSelector(sectionSelector - 1)
            }
          }}
        >
          &lt;
        </button>
        <span>{state.context.currentRubricSection}</span>
        <button
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
        </button>
      </>

      <div>
        {rubricEntries
          .filter(
            (entry) =>
              entry.rubricWritingLevels.includes(WritingLevelEnum.ACADEMIC) &&
              entry.rubricSection === state.context.currentRubricSection
          )
          .map((entry) => (
            <div key={entry._id!}>
              <input
                type='checkbox'
                checked={state.context.draftToGrade.rubricEntries.some(
                  (entries) => entries.entry === entry.entry
                )}
                value={[
                  entry.entry,
                  entry.score.toString(),
                  entry.howToImprove!,
                ]}
                onChange={handleChange}
              />
              <span>{entry.entry}</span>
            </div>
          ))}
      </div>
      <AdditionalComments />
      <span>Score: </span>
      <span>{state.context.draftToGrade.score}</span>
    </>
  )
}

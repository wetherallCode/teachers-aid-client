import React, { FC, useState, useEffect } from 'react'
import { useGradeEssayContextProvider } from '../GradeEssayContext'
import { useEnumContextProvider } from '../../../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../../../hooks/useCheckBox'
import {
  ReturnedRubricEntryInput,
  WritingLevelEnum,
  findRubricEntries_findRubricEntries_rubricEntries,
} from '../../../../../../../schemaTypes'

export type AdvancedGradingToolProps = {
  rubricEntries: findRubricEntries_findRubricEntries_rubricEntries[]
}

export const AdvancedGradingTool: FC<AdvancedGradingToolProps> = ({
  rubricEntries,
}) => {
  const [state, event] = useGradeEssayContextProvider()
  const { rubricSectionEnum } = useEnumContextProvider()
  const [sectionSelector, setSectionSelector] = useState(0)
  const [rubricList, handleChange] = useCheckBox()
  const rubricEntriesList: ReturnedRubricEntryInput[] = []

  rubricList.forEach((entry: string) => {
    const splitValues = entry.split(',')

    const rubricEntryValues: ReturnedRubricEntryInput = {
      entry: splitValues[0],
      rubricSection: state.context.currentRubricSection,
      rubricWritingLevel: WritingLevelEnum.ADVANCED,
      score: Number(splitValues[1]),
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
        payload: averageScore,
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
      <div>Advanced Rubric</div>

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
                value={[entry.entry, entry.score.toString()]}
                onChange={handleChange}
              />
              <span>{entry.entry}</span>
            </div>
          ))}
      </div>
      <span>Score: </span>
      <span>{state.context.score}</span>
    </>
  )
}

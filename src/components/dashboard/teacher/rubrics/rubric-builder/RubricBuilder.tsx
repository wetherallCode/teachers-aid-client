import React, { FC, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildRubricEntry,
  buildRubricEntryVariables,
  WritingLevelEnum,
  RubricSectionEnum,
} from '../../../../../schemaTypes'
import { useMachine } from '@xstate/react'
import { rubricBuilderMachine } from './rubricBuilderMachine'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'

export type RubricBuilderProps = {}

export const BUILD_RUBRIC_ENTRY_MUTATION = gql`
  mutation buildRubricEntry($input: BuildRubricEntryInput!) {
    buildRubricEntry(input: $input) {
      rubricEntry {
        entry
        score
        rubricSection
        rubricWritingLevels
      }
    }
  }
`

export const RubricBuilder: FC<RubricBuilderProps> = () => {
  const [state, event] = useMachine(rubricBuilderMachine)
  const [writingLevels, handleChange, resetList] = useCheckBox()
  console.log(writingLevels)
  useEffect(() => {
    event({
      type: 'SET_WRITING_LEVELS',
      payload: writingLevels as WritingLevelEnum[],
    })
  }, [event, writingLevels])

  const { rubricSectionEnum, writingLevelEnum } = useEnumContextProvider()
  console.log(state.context.writingLevels)
  const [buildRubricEntry] = useMutation<
    buildRubricEntry,
    buildRubricEntryVariables
  >(BUILD_RUBRIC_ENTRY_MUTATION, {
    variables: {
      input: {
        entry: state.context.entry,
        rubricWritingLevels: state.context.writingLevels,
        rubricSection: state.context.section,
        score: state.context.score,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findRubricEntries'],
  })
  return (
    <form onSubmit={(e: any) => e.preventDefault()}>
      <div>Rubric Builder</div>
      <div>Rubric Section: </div>
      <div>
        <select
          onChange={(e: any) => {
            if (e.target.value !== 'none') {
              event({ type: 'SET_SECTION', payload: e.target.value })
            }
          }}
        >
          <option value={'none'}>Pick a Section</option>
          {rubricSectionEnum.map((section: RubricSectionEnum) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>
      <div>Rubric Writing Level</div>
      {writingLevelEnum.map((level: WritingLevelEnum) => (
        <div key={level}>
          <span>
            <input
              type='checkbox'
              checked={writingLevels.includes(level)}
              value={level}
              onChange={handleChange}
            />
          </span>{' '}
          <span>{level}</span>
        </div>
      ))}
      <div>Entry</div>
      <input
        type='text'
        onChange={(e: any) =>
          event({ type: 'SET_ENTRY', payload: e.target.value })
        }
      />
      <div>Score</div>
      <span>
        <button
          onClick={() => {
            if (state.context.score > 0) {
              event({ type: 'SET_SCORE', payload: state.context.score - 1 })
            }
          }}
        >
          &lt;
        </button>{' '}
      </span>
      <span>{state.context.score}</span>{' '}
      <button
        onClick={() => {
          if (state.context.score < 5) {
            event({ type: 'SET_SCORE', payload: state.context.score + 1 })
          }
        }}
      >
        &gt;
      </button>
      <div>
        <div>Entry</div>
        <div>{state.context.entry}</div>
        <div>Score</div>
        <div>{state.context.score}</div>
        <div>Section</div>
        <div>{state.context.section}</div>
        <div>Writing Levels</div>
        {state.context.writingLevels.map((level) => (
          <div key={level}>{level}</div>
        ))}
        <button
          type='reset'
          onClick={(e: any) => {
            buildRubricEntry()
            event({ type: 'RESET' })
            resetList()
          }}
        >
          Add Entry
        </button>
      </div>
    </form>
  )
}

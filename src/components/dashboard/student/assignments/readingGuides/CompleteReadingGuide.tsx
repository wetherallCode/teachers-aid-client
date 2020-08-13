import React, { FC, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  updateReadingGuideVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateReadingGuide,
  findReadingGuideById_findReadingGuideById_readingGuide,
  InformationStructureEnum,
} from '../../../../../schemaTypes'
import { useReadingGuideToCompleteContextProvider } from './state/ReadingGuideToCompleteContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { informationStructure } from '../../../../../utils'
import { SubmitReadingGuide } from './SubmitReadingGuide'

export type CompleteReadingGuideProps = {
  readingGuideInfo: findReadingGuideById_findReadingGuideById_readingGuide
}

export const UPDATE_READING_GUIDE_MUTATION = gql`
  mutation updateReadingGuide($input: UpdateReadingGuideInput!) {
    updateReadingGuide(input: $input) {
      readingGuide {
        _id
      }
    }
  }
`
export const CompleteReadingGuide: FC<CompleteReadingGuideProps> = ({
  readingGuideInfo,
}) => {
  const [state, event] = useReadingGuideToCompleteContextProvider()

  const { informationStructureEnum } = useEnumContextProvider()
  const [infoStructureList, handleChecks] = useCheckBox([])

  const [questionToClarify, setQuestionToClarify] = useState('')
  const [clarifyingQuestions, setClarifyingQuestions] = useState<string[]>([])
  const handleDelete = (index: number) => {
    setClarifyingQuestions((list) => [
      ...list.slice(0, index),
      ...list.slice(index + 1),
    ])
  }

  const [updateReadingGuide] = useMutation<
    updateReadingGuide,
    updateReadingGuideVariables
  >(UPDATE_READING_GUIDE_MUTATION, {
    variables: { input: state.context.updateReadingGuideInputs },
    // onCompleted: (data) => console.log(data),
    refetchQueries: ['findReadingGuideById'],
  })

  useEffect(() => {
    updateReadingGuide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.context.updateReadingGuideInputs])

  useEffect(() => {
    event({ type: 'SET_HOW_IS_ORGANIZED', payload: infoStructureList })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoStructureList])

  useEffect(() => {
    event({ type: 'SET_CLARIFYING_QUESTION', payload: clarifyingQuestions })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clarifyingQuestions])

  const multipleSections =
    readingGuideInfo.lessonInfo.assignedSectionIdList.length > 1

  return (
    <>
      <div
        onMouseOver={() =>
          event({ type: 'SET_HELP', payload: 'howIsSectionOrganized' })
        }
      >
        <div>
          {multipleSections
            ? 'How is the information in these sections organized?'
            : 'How is the information in this section organized?'}
        </div>
        {informationStructureEnum.map((item: InformationStructureEnum) => (
          <div key={item}>
            <span>
              <input type='checkbox' value={item} onChange={handleChecks} />
            </span>
            <span>{informationStructure(item)}</span>
          </div>
        ))}
      </div>
      <div
        onMouseOver={() =>
          event({ type: 'SET_HELP', payload: 'whyWasSectionOrganized' })
        }
      >
        {infoStructureList.length > 1
          ? 'Why do you think the author used these ways to organize the information?'
          : 'Why do you think the author used this way to organize the information?'}
      </div>
      <input
        onFocus={() =>
          event({ type: 'SET_HELP', payload: 'whyWasSectionOrganized' })
        }
        onChange={(e: any) =>
          event({ type: 'SET_WHY_IS_ORGANIZED', payload: e.target.value })
        }
      />
      <div
        onMouseOver={() => event({ type: 'SET_HELP', payload: 'majorIssue' })}
      >
        {multipleSections
          ? 'What was the major issue discussed in the sections'
          : 'What was the major issue discussed in the section'}
      </div>
      <input
        onFocus={() => event({ type: 'SET_HELP', payload: 'majorIssue' })}
        onChange={(e: any) =>
          event({ type: 'SET_MAJOR_ISSUE', payload: e.target.value })
        }
      />
      <div
        onMouseOver={() =>
          event({ type: 'SET_HELP', payload: 'majorIssueSolved' })
        }
      >
        {multipleSections
          ? 'Was the issue handled in the sections'
          : 'Was the issue handled in the section'}
      </div>
      <select
        onFocus={() => event({ type: 'SET_HELP', payload: 'majorIssueSolved' })}
        onChange={(e: any) =>
          event({
            type: 'SET_MAJOR_ISSUE_SOLVED',
            payload: e.target.value === 'True' ? true : false,
          })
        }
      >
        <option>Yes</option>
        <option>No</option>
      </select>
      {state.context.updateReadingGuideInputs.majorIssueSolved ? (
        <div
          onMouseOver={() =>
            event({ type: 'SET_HELP', payload: 'majorSolution' })
          }
        >
          <div>How was the issue solved?</div>
          <input
            onFocus={() =>
              event({ type: 'SET_HELP', payload: 'majorSolution' })
            }
            onChange={(e: any) =>
              event({ type: 'SET_MAJOR_SOLUTION', payload: e.target.value })
            }
          />
        </div>
      ) : (
        <div
          onMouseOver={() =>
            event({ type: 'SET_HELP', payload: 'majorSolution' })
          }
        >
          <div>Why was the issue not solved?</div>
          <input
            onFocus={() =>
              event({ type: 'SET_HELP', payload: 'majorSolution' })
            }
            onChange={(e: any) =>
              event({ type: 'SET_MAJOR_SOLUTION', payload: e.target.value })
            }
          />
        </div>
      )}
      <div
        onMouseOver={() =>
          event({ type: 'SET_HELP', payload: 'clarifyingQuestions' })
        }
      >
        Come up with at least one (or more) questions that would help you
        understand the section better.
      </div>
      <form onSubmit={(e: any) => e.preventDefault()}>
        <input
          onFocus={() =>
            event({ type: 'SET_HELP', payload: 'clarifyingQuestions' })
          }
          onChange={(e: any) => setQuestionToClarify(e.target.value)}
        />
        <button
          type='reset'
          onClick={() => {
            setClarifyingQuestions((list) => [...list, questionToClarify])
            setQuestionToClarify('')
          }}
        >
          Add Question
        </button>
      </form>
      <div>
        {clarifyingQuestions.map((question, i) => (
          <div key={i}>
            <span>{question}</span>
            <span onClick={() => handleDelete(i)}>-</span>
          </div>
        ))}
      </div>
      {infoStructureList.length > 0 && <SubmitReadingGuide />}
    </>
  )
}

import React, { FC, useEffect } from 'react'
import { useStudentEssayContextProvider } from '../../StudentEssayContext'
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAnswerType,
  setAnswerTypeVariables,
  QuestionTypeEnum,
} from '../../../../../../../../schemaTypes'
import { gql, useMutation } from '@apollo/client'
import { AcademicProblemSolution } from './AcademicProblemSolution'
import { AcademicHowCauseEffect } from './AcademicHowCauseEffect'
import { AcademicWhyCauseEffect } from './AcademicWhyCauseEffect'
import { useEnumContextProvider } from '../../../../../../../../contexts/EnumContext'

export type AcademicAnswerTypesProps = {}

export const SET_ANSWER_TYPE_MUTATION = gql`
  mutation setAnswerType($input: SetAnswerTypeInput!) {
    setAnswerType(input: $input) {
      essay {
        _id
      }
    }
  }
`

export const AcademicAnswerTypes: FC<AcademicAnswerTypesProps> = () => {
  const [state, event] = useStudentEssayContextProvider()
  const { questionTypeEnum } = useEnumContextProvider()

  const [setAnswerType] = useMutation<setAnswerType, setAnswerTypeVariables>(
    SET_ANSWER_TYPE_MUTATION,
    {
      variables: {
        input: {
          essayId: state.context.essayId,
          questionType: state.context.academicOrganizer.questionType,
        },
      },
      onCompleted: (data) => console.log(data),
      refetchQueries: ['findEssayById'],
    }
  )

  useEffect(() => {
    if (!state.context.academicOrganizer.answer.preLoaded) {
      setAnswerType()
    }
  }, [
    setAnswerType,
    state.context.academicOrganizer.answer.preLoaded,
    state.context.academicOrganizer.questionType,
  ])

  useEffect(() => {
    if (state.context.academicOrganizer.answer.preLoaded) {
      event({ type: 'NEXT' })
    }
  }, [event, state.context.academicOrganizer.answer.preLoaded])

  return (
    <>
      {state.matches('organizers.academicOrganizer.answer.questionType') && (
        <>
          <span>What is the Question Type: </span>
          <span>
            <select
              value={state.context.academicOrganizer.questionType}
              onChange={(e: any) => {
                if (e.target.value !== 'none') {
                  event({
                    type: 'SET_FULL_QUESTION_TYPE',
                    payload: e.target.value,
                  })
                }
              }}
            >
              <option value={'none'}>Pick a Question Type</option>
              {questionTypeEnum.map((question: QuestionTypeEnum) => (
                <option key={question} value={question}>
                  {question === 'HOW_PROBLEM_SOLUTION'
                    ? 'How: Problem and Solution'
                    : question === 'HOW_CAUSE_EFFECT'
                    ? 'How: Cause and Effect'
                    : 'Why: Cause and Effect'}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                event({ type: 'NEXT' })
              }}
            >
              Use this Question Type
            </button>
          </span>
        </>
      )}
      {state.matches('organizers.academicOrganizer.answer.problemSolution') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_PROBLEM_SOLUTION && <AcademicProblemSolution />}
      {state.matches('organizers.academicOrganizer.answer.howCauseEffect') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.HOW_CAUSE_EFFECT && <AcademicHowCauseEffect />}
      {state.matches('organizers.academicOrganizer.answer.whyCauseEffect') &&
        state.context.academicOrganizer.questionType ===
          QuestionTypeEnum.WHY_CAUSE_EFFECT && <AcademicWhyCauseEffect />}
    </>
  )
}

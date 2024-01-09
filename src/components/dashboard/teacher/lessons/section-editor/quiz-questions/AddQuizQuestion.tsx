import { gql, useMutation } from '@apollo/client'
import { stat } from 'fs'
import React, { useEffect, useState } from 'react'
import { useEnumContextProvider } from '../../../../../../contexts/EnumContext'
import {
  createQuizQuestionVariables,
  createQuizQuestion,
  QuizQuestionTypeEnum,
  QuizQuestionDifficultyLevelEnum,
  AnswerListInput,
} from '../../../../../../schemaTypes'
import { useSectionEditorContextProvider } from '../state-n-styles/sectionEditorContext'
import { FIND_QUIZ_QUESTIONS_BY_TEXT_SECTION_ID_QUERY } from './QuizQuestions'

export type AddQuizQuestionProps = {}

export const CREATE_QUIZ_QUESTION_MUTATION = gql`
  mutation createQuizQuestion($input: CreateQuizQuestionInput!) {
    createQuizQuestion(input: $input) {
      quizQuestion {
        _id
      }
    }
  }
`

export const AddQuizQuestion = ({}: AddQuizQuestionProps) => {
  const [state, event] = useSectionEditorContextProvider()
  const [answer, setAnswer] = useState<AnswerListInput>({
    answer: '',
    correct: false,
    partiallyCorrect: false,
    removable: false,
  })
  const [trueStatement, setTrueStatement] = useState(true)

  const { quizQuestionDifficultyLevelEnum, quizQuestionTypeEnum } =
    useEnumContextProvider()
  const [createQuizQuestion] = useMutation<
    createQuizQuestion,
    createQuizQuestionVariables
  >(CREATE_QUIZ_QUESTION_MUTATION, {
    variables: { input: state.context.quizQuestion },
    onCompleted: () => event({ type: 'RESET_QUIZ_QUESTION_INPUTS' }),
    refetchQueries: [
      {
        query: FIND_QUIZ_QUESTIONS_BY_TEXT_SECTION_ID_QUERY,
        variables: {
          input: { associatedTextSectionId: state.context.sectionId },
        },
      },
      // 'findQuizQuestionsByTextSectionId',
    ],
  })
  const removableToggle = !answer.correct && !answer.partiallyCorrect

  useEffect(() => {
    event({
      type: 'SET_QUIZ_QUESTION_INPUT',
      keyName: 'associatedTextSectionId',
      payload: state.context.sectionId,
    })
  }, [])

  useEffect(() => {
    if (
      state.context.quizQuestion.questionType ===
      QuizQuestionTypeEnum.TRUE_FALSE
    ) {
      event({
        type: 'SET_QUIZ_QUESTION_INPUT',
        keyName: 'answerList',
        payload: [
          {
            answer: 'True',
            correct: trueStatement,
            partiallyCorrect: false,
            removable: false,
          },
          {
            answer: 'False',
            correct: !trueStatement,
            partiallyCorrect: false,
            removable: false,
          },
        ],
      })
    }
    if (
      state.context.quizQuestion.questionType ===
      QuizQuestionTypeEnum.MULTIPLE_CHOICE
    ) {
      event({
        type: 'SET_QUIZ_QUESTION_INPUT',
        keyName: 'answerList',
        payload: [],
      })
    }
  }, [state.context.quizQuestion.questionType, trueStatement])
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>Add Quiz Questions</div>
        <div>Question:</div>
        <input
          onChange={(e) =>
            event({
              type: 'SET_QUIZ_QUESTION_INPUT',
              keyName: 'question',
              payload: e.target.value,
            })
          }
        />
        <div>Question Type</div>
        <select
          onChange={(e) =>
            event({
              type: 'SET_QUIZ_QUESTION_INPUT',
              keyName: 'questionType',
              payload: e.target.value,
            })
          }
        >
          {quizQuestionTypeEnum.map((questionType: QuizQuestionTypeEnum) => (
            <option key={questionType}>{questionType}</option>
          ))}
        </select>
        <div>Difficulty Level</div>
        <select
          onChange={(e) =>
            event({
              type: 'SET_QUIZ_QUESTION_INPUT',
              keyName: 'difficultyLevel',
              payload: e.target.value,
            })
          }
        >
          {quizQuestionDifficultyLevelEnum.map(
            (difficultyLevel: QuizQuestionDifficultyLevelEnum) => (
              <option key={difficultyLevel}>{difficultyLevel}</option>
            ),
          )}
        </select>
        {state.context.quizQuestion.questionType ===
          QuizQuestionTypeEnum.MULTIPLE_CHOICE && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>Answer List Creator</div>
            <div>Answer</div>
            <input
              onChange={(e) => setAnswer({ ...answer, answer: e.target.value })}
            />
            <div>Correct</div>
            <select
              value={answer.correct ? 'yes' : 'no'}
              onChange={(e) => {
                setAnswer({
                  ...answer,
                  correct: e.target.value === 'yes' ? true : false,
                })
              }}
            >
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </select>
            <div>Partially Correct</div>
            <select
              value={answer.partiallyCorrect ? 'yes' : 'no'}
              onChange={(e) =>
                setAnswer({
                  ...answer,
                  partiallyCorrect: e.target.value === 'yes' ? true : false,
                })
              }
            >
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </select>
            {removableToggle && (
              <>
                <div>Removeable</div>
                <select
                  value={answer.removable ? 'yes' : 'no'}
                  onChange={(e) =>
                    setAnswer({
                      ...answer,
                      removable: e.target.value === 'yes' ? true : false,
                    })
                  }
                >
                  <option value={'yes'}>Yes</option>
                  <option value={'no'}>No</option>
                </select>
              </>
            )}
            <button
              type="reset"
              onClick={() => {
                event({
                  type: 'SET_QUIZ_QUESTION_INPUT',
                  keyName: 'answerList',
                  payload: [...state.context.quizQuestion.answerList, answer],
                })
                setAnswer({
                  answer: '',
                  correct: false,
                  partiallyCorrect: false,
                  removable: false,
                })
              }}
            >
              Add Answer
            </button>
          </form>
        )}
        {state.context.quizQuestion.questionType ===
          QuizQuestionTypeEnum.TRUE_FALSE && (
          <>
            <div>True Statement?</div>
            <select
              value={trueStatement ? 'yes' : 'no'}
              onChange={(e) => {
                setTrueStatement(e.target.value === 'yes' ? true : false)
              }}
            >
              <option value={'yes'}>Yes</option>
              <option value={'no'}>No</option>
            </select>
          </>
          // <form onSubmit={(e) => e.preventDefault()}>
          //   <div>Answer List Creator</div>
          //   <div>Answer</div>
          //   <input
          //     onChange={(e) => setAnswer({ ...answer, answer: e.target.value })}
          //   />
          //   <div>Correct</div>
          //   <select
          //     value={answer.correct ? 'yes' : 'no'}
          //     onChange={(e) => {
          //       setAnswer({
          //         ...answer,
          //         correct: e.target.value === 'yes' ? true : false,
          //       })
          //     }}
          //   >
          //     <option value={'yes'}>Yes</option>
          //     <option value={'no'}>No</option>
          //   </select>
          //   <div>Partially Correct</div>
          //   <select
          //     value={answer.partiallyCorrect ? 'yes' : 'no'}
          //     onChange={(e) =>
          //       setAnswer({
          //         ...answer,
          //         partiallyCorrect: e.target.value === 'yes' ? true : false,
          //       })
          //     }
          //   >
          //     <option value={'yes'}>Yes</option>
          //     <option value={'no'}>No</option>
          //   </select>
          //   <button
          //     type='reset'
          //     onClick={() =>
          //       event({
          //         type: 'SET_QUIZ_QUESTION_INPUT',
          //         keyName: 'answerList',
          //         payload: [...state.context.quizQuestion.answerList, answer],
          //       })
          //     }
          //   >
          //     Add Answer
          //   </button>
          // </form>
        )}

        <div>Quiz Question Preview</div>
        <div>{state.context.quizQuestion.question}</div>
        <div>{state.context.quizQuestion.questionType}</div>
        <div>{state.context.quizQuestion.difficultyLevel}</div>
        <div>
          {state.context.quizQuestion.answerList.map((answer, i: number) => (
            <div key={i}>
              <span>Answer: {answer.answer}</span>
              <span> Correct: {answer.correct ? 'Yes' : 'No'}</span>
              <span>
                {' '}
                Partially Correct: {answer.partiallyCorrect ? 'Yes' : 'No'}
              </span>
              <span> Removable: {answer.removable ? 'Yes' : 'No'}</span>
            </div>
          ))}
        </div>
        <button
          type="reset"
          onClick={() => {
            const multipleChoiceReady =
              state.context.quizQuestion.questionType ===
                QuizQuestionTypeEnum.MULTIPLE_CHOICE &&
              state.context.quizQuestion.answerList.length >= 3 &&
              state.context.quizQuestion.question
            const trueFalseReady =
              state.context.quizQuestion.questionType ===
                QuizQuestionTypeEnum.TRUE_FALSE &&
              state.context.quizQuestion.question
            if (multipleChoiceReady || trueFalseReady) createQuizQuestion()
          }}
        >
          Create Quiz Question
        </button>
      </form>
    </div>
  )
}

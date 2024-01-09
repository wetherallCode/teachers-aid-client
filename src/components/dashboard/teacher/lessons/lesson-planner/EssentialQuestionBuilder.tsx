import { gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import {
  createEssentialQuestion,
  createEssentialQuestionVariables,
  findEssentialQuestionsByAssociatedTextSectionIds,
  findEssentialQuestionsByAssociatedTextSectionIdsVariables,
  findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds_essentialQuestions,
} from '../../../../../schemaTypes'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'

export type EssentialQuestionBuilderProps = {}

export const CREATE_ESSENTIAL_QUESTION_MUTATION = gql`
  mutation createEssentialQuestion($input: CreateEssentialQuestionInput!) {
    createEssentialQuestion(input: $input) {
      essentialQuestion {
        _id
      }
    }
  }
`

export const FIND_ESSENTIAL_QUESTIONS_QUERY = gql`
  query findEssentialQuestionsByAssociatedTextSectionIds(
    $input: FindEssentialQuestionsByAssociatedTextSectionIdsInput!
  ) {
    findEssentialQuestionsByAssociatedTextSectionIds(input: $input) {
      essentialQuestions {
        _id
        question
      }
    }
  }
`

export const EssentialQuestionBuilder = ({}: EssentialQuestionBuilderProps) => {
  const [state, event] = useLessonPlannerContextProvider()

  const [createEssentialQuestion] = useMutation<
    createEssentialQuestion,
    createEssentialQuestionVariables
  >(CREATE_ESSENTIAL_QUESTION_MUTATION, {
    variables: {
      input: {
        associatedTextSectionsIds: state.context.textSectionList,
        question: state.context.essentialQuestion,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findEssentialQuestionsByAssociatedTextSectionIds'],
  })

  const { loading, data } = useQuery<
    findEssentialQuestionsByAssociatedTextSectionIds,
    findEssentialQuestionsByAssociatedTextSectionIdsVariables
  >(FIND_ESSENTIAL_QUESTIONS_QUERY, {
    variables: {
      input: { textSectionIds: state.context.textSectionList },
    },
    onCompleted: (data) =>
      console.log(
        data.findEssentialQuestionsByAssociatedTextSectionIds.essentialQuestions.reduce(
          (
            acc: findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds_essentialQuestions[],
            i,
          ) => {
            return acc.some((q) => q._id === i._id) ? [...acc] : [...acc, i]
          },
          [],
        ),
      ),
    onError: (error) => console.error(error),
  })
  const essentialQuestionList =
    data?.findEssentialQuestionsByAssociatedTextSectionIds.essentialQuestions.reduce(
      (
        acc: findEssentialQuestionsByAssociatedTextSectionIds_findEssentialQuestionsByAssociatedTextSectionIds_essentialQuestions[],
        i,
      ) => {
        return acc.some((q) => q._id === i._id) ? [...acc] : [...acc, i]
      },
      [],
    )
  if (loading) return <div>Loading </div>

  return (
    <div>
      <div>Essential Question</div>
      <div>
        {essentialQuestionList?.map((q) => (
          <div
            key={q._id}
            onClick={() =>
              event({ type: 'SET_ESSENTIAL_QUESTION', payload: q.question })
            }
          >
            {q.question}
          </div>
        ))}
      </div>
      <input
        onChange={(e) =>
          event({ type: 'SET_ESSENTIAL_QUESTION', payload: e.target.value })
        }
      />
      <button onClick={() => createEssentialQuestion()}>
        Use this Question Instead
      </button>
    </div>
  )
}

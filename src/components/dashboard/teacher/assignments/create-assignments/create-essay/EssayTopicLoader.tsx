import { gql, useQuery } from '@apollo/client'
import {
  findTextSectionsByIdForEssayQuestionLoader,
  findTextSectionsByIdForEssayQuestionLoaderVariables,
  findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions_questionParts,
} from '../../../../../../schemaTypes'
import { useCreateAssignmentContextPovider } from '../state-and-styles/CreateAssignmentContext'

export type EssayTopicLoaderProps = {
  ids: string[]
}

export const FIND_TEXT_SECTIONS_BY_ID_MUTATION = gql`
  query findTextSectionsByIdForEssayQuestionLoader(
    $input: FindTextSectionsByIdInput!
  ) {
    findTextSectionsById(input: $input) {
      textSections {
        hasEssayQuestions {
          _id
          questionParts {
            originalQuestion
            questionType
          }
        }
      }
    }
  }
`

export const EssayTopicLoader = ({ ids }: EssayTopicLoaderProps) => {
  const [state, event] = useCreateAssignmentContextPovider()
  console.log(ids)
  useQuery<
    findTextSectionsByIdForEssayQuestionLoader,
    findTextSectionsByIdForEssayQuestionLoaderVariables
  >(FIND_TEXT_SECTIONS_BY_ID_MUTATION, {
    variables: {
      input: { _ids: ids },
    },
    onCompleted: (data) => {
      // console.log(
      //   data.findTextSectionsById.textSections.map((section) =>
      //     section.hasEssayQuestions.map((question) => [
      //       question.questionParts.originalQuestion,
      //       question.questionParts.questionType,
      //       question._id,
      //     ])
      //   )
      // )
      // console.log(data)
      console.log(
        data.findTextSectionsById.textSections.map((section) =>
          section.hasEssayQuestions.map((question) => [
            question.questionParts.originalQuestion,
            question.questionParts.questionType,
            question._id,
          ])
        )
      )
      const questionList = data.findTextSectionsById.textSections
        .map((section) =>
          section.hasEssayQuestions.map((question) => [
            question.questionParts.originalQuestion,
            question.questionParts.questionType,
            question._id,
          ])
        )
        .reduce(
          (
            acc: findTextSectionsByIdForEssayQuestionLoader_findTextSectionsById_textSections_hasEssayQuestions_questionParts[],
            i: any
          ) => {
            console.log(i)
            return acc.includes(i) ? [...acc] : [...i]
          },
          []
        )!
      console.log(questionList)
      event({
        type: 'SET_QUESTION_LIST',
        payload: questionList,
      })
    },
    onError: (error) => console.error(error),
  })
  return null
}

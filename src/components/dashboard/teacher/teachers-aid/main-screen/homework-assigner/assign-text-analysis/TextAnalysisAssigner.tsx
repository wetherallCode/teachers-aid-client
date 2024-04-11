import React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import {
  findLessonByCourseAndDate,
  findLessonByCourseAndDateVariables,
  createTextAnalysis,
  createTextAnalysisVariables,
} from '../../../../../../../schemaTypes'
import { FIND_LESSON_QUERY } from '../../../../../../lesson/LessonMainMenu'
import { date } from '../../../../../../../utils'
import { useTeachersAidContextProvider } from '../../../state/TeachersAidContext'

export type TextAnalysisAssignerProps = {}

const CREATE_TEXT_ANALYSIS = gql`
  mutation createTextAnalysis($input: CreateTextAnalysisInput!) {
    createTextAnalysis(input: $input) {
      textAnalyses {
        _id
      }
    }
  }
`
export const TextAnalysisAssigner = ({}: TextAnalysisAssignerProps) => {
  const [state, event] = useTeachersAidContextProvider()

  const [createTextAnalysis] = useMutation<
    createTextAnalysis,
    createTextAnalysisVariables
  >(CREATE_TEXT_ANALYSIS, {
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => console.error(error),
  })

  const { loading, data } = useQuery<
    findLessonByCourseAndDate,
    findLessonByCourseAndDateVariables
  >(FIND_LESSON_QUERY, {
    variables: {
      input: {
        courseId: state.context.courseInfo!.course._id!,
        lessonDate: date,
      },
    },
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>

  return (
    <div>
      <div>Text Analysis Assigner</div>
    </div>
  )
}

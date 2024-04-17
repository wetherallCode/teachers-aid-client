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
import { Lesson } from '../../../../lessons/lesson-finder/Lesson'

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
      console.log(data.findLessonByCourseAndDate.lesson?.lessonName)
    },
    onError: (error) => console.error(error),
  })

  if (loading) return <div>Loading </div>
  const { lessonName, pageNumbers, assignedSections } =
    data?.findLessonByCourseAndDate.lesson!
  return (
    <div>
      <div>Text Analysis Assigner</div>
      {/*<button*/}
      {/*  onClick={() =>*/}
      {/*    createTextAnalysis({*/}
      {/*      variables: {*/}
      {/*        input: {*/}
      {/*          assignedDate: date,*/}
      {/*          associatedLessonId: lessonName,*/}
      {/*          assignedCourseIds: [state.context.courseInfo!.course._id!],*/}
      {/*          dueDate: date,*/}
      {/*          hasAssignerId: me._id,*/}
      {/*          markingPeriod: state.context.markingPeriod,*/}
      {/*         maxPoints :5,*/}
      {/*          readings:{readingPages:pageNumbers.toString(), readingSections:"""+assignedSections.startingSection+"+" - "+assignedSections.endingSection" } */}
      {/*        */}
      {/*        },*/}
      {/*      },*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  Create*/}
      {/*</button>*/}
    </div>
  )
}

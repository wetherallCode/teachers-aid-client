import { gql, useMutation } from '@apollo/client'
import { create } from 'domain'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useEnumContextProvider } from '../../../../../contexts/EnumContext'
import { useMarkingPeriodContextProvider } from '../../../../../contexts/markingPeriod/MarkingPeriodContext'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import {
  createQuizzesByCourse,
  createQuizzesByCourseVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { dateConverter, dateInputConverter } from '../../../../../utils'
import { useLessonPlannerContextProvider } from '../lesson-planner/state-and-styles/lessonPlannerContext'
import { FindAllQuizzableLessons } from './FindAllQuizzableLessons'

import { useCreateQuizContextProvider } from './state-n-styles/CreateQuizContext'

export type CreateQuizProps = {}

export const CREATE_QUIZZES_MUTATION = gql`
  mutation createQuizzesByCourse($input: CreateQuizzesByCourseInput!) {
    createQuizzesByCourse(input: $input) {
      quizzes {
        _id
      }
    }
  }
`
export const CreateQuiz = ({}: CreateQuizProps) => {
  const [state, event] = useLessonPlannerContextProvider()
  const me: me_me_Teacher = useUserContextProvider()
  const { markingPeriodEnum } = useEnumContextProvider()
  const [mp] = useMarkingPeriodContextProvider()
  const { currentMarkingPeriod } = mp.context
  const params = useParams()
  const { date } = params
  // const quizDate = new Date(Number(date)).toLocaleDateString()\
  const [createQuizzes] = useMutation<
    createQuizzesByCourse,
    createQuizzesByCourseVariables
  >(CREATE_QUIZZES_MUTATION, {
    variables: { input: state.context.createQuizInputs },
    onCompleted: (data) => console.log(data),
    refetchQueries: [],
  })
  useEffect(() => {
    event({
      type: 'SET_QUIZ_INPUTS',
      keyName: 'courseIds',
      payload: state.context.courses,
    })
    event({
      type: 'SET_QUIZ_INPUTS',
      keyName: 'hasAssigner',
      payload: me._id!,
    })
    event({
      type: 'SET_QUIZ_INPUTS',
      keyName: 'markingPeriod',
      payload: state.context.markingPeriod,
    })
    event({
      type: 'SET_QUIZ_INPUTS',
      keyName: 'assignedSectionIds',
      payload: state.context.textSectionList,
    })
    event({
      type: 'SET_QUIZ_INPUTS',
      keyName: 'readings',
      payload: {
        readingPages: `${state.context.startingPage} - ${state.context.endingPage}`,
        readingSections: `${state.context.startingSection} - ${state.context.endingSection}`,
      },
    })
  }, [state.context.courses])
  console.log(state.context.markingPeriod)
  return (
    <div>
      {/* <FindAllQuizzableLessons assignedDate={quizDate} /> */}
      <div>Create Quiz</div>
      <div>
        When?{' '}
        <input
          type='date'
          value={dateInputConverter(
            state.context.createQuizInputs.assignedDate
          )}
          onChange={(e) => {
            // console.log(new Date(e.target.value).toLocaleDateString())
            // console.log(dateConverter(e.target.value))
            event({
              type: 'SET_QUIZ_INPUTS',
              keyName: 'assignedDate',
              payload: dateConverter(e.target.value),
            })
            event({
              type: 'SET_QUIZ_INPUTS',
              keyName: 'dueDate',
              payload: dateConverter(e.target.value),
            })
            event({
              type: 'SET_QUIZ_INPUTS',
              keyName: 'dueTime',
              payload: '2:15:00 PM',
            })
          }}
        />
      </div>
      <button onClick={() => createQuizzes()}>Create Quizzes</button>
    </div>
  )
}

import React, { FC, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import {
  findLessonsByCourse,
  findLessonsByCourseVariables,
} from '../../../../../../../schemaTypes'
import { AssignLesson } from './AssignLesson'

export type LessonSelectProps = {
  course: string
}

export const FIND_LESSONS_BY_COURSE_QUERY = gql`
  query findLessonsByCourse($input: FindLessonByCourseInput!) {
    findLessonByCourse(input: $input) {
      lessons {
        _id
        lessonName
      }
    }
  }
`

export const LessonSelect: FC<LessonSelectProps> = ({ course }) => {
  const [lessonId, setLessonId] = useState('')
  const { loading, data } = useQuery<
    findLessonsByCourse,
    findLessonsByCourseVariables
  >(FIND_LESSONS_BY_COURSE_QUERY, {
    variables: {
      input: { courseId: course },
    },
    onCompleted: (data) => console.log(data.findLessonByCourse.lessons),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setLessonId(e.target.value)
          }
        }}
      >
        <option value={'none'}>Select a Lesson</option>
        {data?.findLessonByCourse.lessons.map((lesson) => (
          <option key={lesson._id!} value={lesson._id!}>
            {lesson.lessonName}
          </option>
        ))}
      </select>
      {lessonId && <AssignLesson courseId={course} lessonId={lessonId} />}
    </>
  )
}

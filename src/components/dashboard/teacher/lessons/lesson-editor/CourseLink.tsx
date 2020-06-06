import React, { FC, useEffect } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { gql, useQuery } from '@apollo/client'
import {
  findCoursesById,
  findCoursesByIdVariables,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { CourseLinkSelect } from './CourseLinkSelect'

export type CourseLinkProps = {}

export const FIND_COURSES_BY_ID_QUERY = gql`
  query findCoursesById($input: FindCoursesByIdInput!) {
    findCoursesById(input: $input) {
      courses {
        _id
        period
      }
    }
  }
`

export const CourseLink: FC<CourseLinkProps> = () => {
  const [state, event] = useLessonEditorContextProvider()
  console.log(state.context.courses)
  const { loading, error, data } = useQuery<
    findCoursesById,
    findCoursesByIdVariables
  >(FIND_COURSES_BY_ID_QUERY, {
    variables: {
      input: { _ids: state.context.courses },
    },
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <>
      <div>Linked Courses</div>
      <div>
        {data?.findCoursesById.courses.map((course) => (
          <span key={course._id!}>{course.period} </span>
        ))}
      </div>
      {/* <div>Choose from These Courses</div> */}
      {/* <CourseLinkSelect linkedCourses={state.context.courses} /> */}
    </>
  )
}

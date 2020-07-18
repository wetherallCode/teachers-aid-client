import React, { FC } from 'react'
import { useLessonEditorContextProvider } from './LessonEditorContext'
import { gql, useQuery } from '@apollo/client'
import {
  findCoursesById,
  findCoursesByIdVariables,
  // me_me_Teacher,
} from '../../../../../schemaTypes'
// import { useUserContextProvider } from '../../../../../contexts/UserContext'
// import { useCheckBox } from '../../../../../hooks/useCheckBox'
// import { CourseLinkSelect } from './CourseLinkSelect'

export type CourseLinkProps = {}

export const FIND_COURSES_BY_ID_QUERY = gql`
  query findCoursesById($input: FindCoursesByIdInput!) {
    findCoursesById(input: $input) {
      courses {
        _id
        name
      }
    }
  }
`

export const CourseLink: FC<CourseLinkProps> = () => {
  const [state] = useLessonEditorContextProvider()

  const { loading, data: courseData } = useQuery<
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
        {courseData?.findCoursesById.courses.map((course) => (
          <span key={course._id!}>{course.name} </span>
        ))}
      </div>
      {/* <div>Choose from These Courses</div> */}
      {/* <CourseLinkSelect linkedCourses={state.context.courses} /> */}
    </>
  )
}

import React, { FC, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  getCoursesForUser,
  getCoursesForUserVariables,
  getCoursesForUser_findUserData_user_Teacher,
} from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { useLessonPlannerContextProvider } from './lessonPlannerContext'

export type CourseAssignerProps = {}

export const GET_COURSES_QUERY = gql`
  query getCoursesForUser($input: FindUserDataInput!) {
    findUserData(input: $input) {
      user {
        _id
        ... on Teacher {
          teachesCourses {
            _id
            period
          }
        }
      }
    }
  }
`

export const CourseAssigner: FC<CourseAssignerProps> = () => {
  const me = useUserContextProvider()
  const [, event] = useLessonPlannerContextProvider()
  const [coursesList, handleChange] = useCheckBox()
  console.log(coursesList)
  useEffect(() => {
    event({ type: 'ASSIGN_TO_COURSES', payload: coursesList })
  }, [coursesList, event])

  const { loading, error, data } = useQuery<
    getCoursesForUser,
    getCoursesForUserVariables
  >(GET_COURSES_QUERY, {
    variables: {
      input: { _id: me._id },
    },
  })
  if (loading) return <div>Loading </div>
  if (error) console.error(error)

  const user = data?.findUserData
    .user as getCoursesForUser_findUserData_user_Teacher

  const courseList = user.teachesCourses

  return (
    <div>
      {courseList.map((course) => (
        <div
          key={course._id!}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input type='checkbox' value={course._id!} onChange={handleChange} />
          <div>{course.period}</div>
          <button onClick={() => event({ type: 'NEXT' })}>Next</button>
        </div>
      ))}
    </div>
  )
}

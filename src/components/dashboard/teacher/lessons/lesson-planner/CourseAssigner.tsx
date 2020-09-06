import React, { FC, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  getCoursesForUser,
  getCoursesForUserVariables,
  getCoursesForUser_findUserData_user_Teacher,
  me_me_Teacher,
} from '../../../../../schemaTypes'
import { useUserContextProvider } from '../../../../../contexts/UserContext'
import { useCheckBox } from '../../../../../hooks/useCheckBox'
import { useLessonPlannerContextProvider } from './state-and-styles/lessonPlannerContext'
import {
  AssignCourseContainer,
  LessonPlannerButton,
  AssignCourseName,
  AssignCourseCheckBox,
  CourseToAssignContainer,
  SectionPickerButtonContainer,
} from './state-and-styles/lessonPlannerStyles'
import { CreateLesson } from './CreateLesson'

export type CourseAssignerProps = {}

export const GET_COURSES_QUERY = gql`
  query getCoursesForUser($input: FindUserDataInput!) {
    findUserData(input: $input) {
      user {
        _id
        ... on Teacher {
          teachesCourses {
            _id
            name
          }
        }
      }
    }
  }
`

export const CourseAssigner: FC<CourseAssignerProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [, event] = useLessonPlannerContextProvider()
  const [coursesList, handleChange] = useCheckBox([])
  console.log(me._id)
  useEffect(() => {
    event({ type: 'ASSIGN_TO_COURSES', payload: coursesList })
  }, [coursesList, event])

  const { loading, data } = useQuery<
    getCoursesForUser,
    getCoursesForUserVariables
  >(GET_COURSES_QUERY, {
    variables: {
      input: { _id: me._id! },
    },

    onError: (error) => console.error(error),
  })
  console.log(me)
  // const user = data?.findUserData
  //   .user as getCoursesForUser_findUserData_user_Teacher

  const courseList = me.teachesCourses
  console.log(courseList)
  return (
    <>
      <AssignCourseContainer>
        {courseList.map((course) => (
          <CourseToAssignContainer key={course._id!}>
            <AssignCourseCheckBox
              type='checkbox'
              value={course._id!}
              onChange={handleChange}
            />
            <AssignCourseName>{course.name}</AssignCourseName>
          </CourseToAssignContainer>
        ))}
      </AssignCourseContainer>
      <SectionPickerButtonContainer>
        <LessonPlannerButton onClick={() => event({ type: 'PREVIOUS' })}>
          Back
        </LessonPlannerButton>
        <CreateLesson />
      </SectionPickerButtonContainer>
    </>
  )
}

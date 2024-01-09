import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router'
import { useTeacherNavContextProvider } from '../../../../navigation/teacher-nav/TeacherNavContext'
import {
  me_me_Teacher_teachesCourses,
  toggleAssignmentsAllowedInClass,
  toggleAssignmentsAllowedInClassVariables,
  toggleReadingGuideCheck,
  toggleReadingGuideCheckVariables,
} from '../../../../schemaTypes'
import {
  AssignmentControlDisplayContainer,
  CourseManagerHomeContainer,
  CourseManagerHomeTitle,
  CourseManagerHomeTitleBackLink,
  CourseMenuContainer,
  CourseMenuItemBlock,
  CourseMenuItemBlockLink,
} from './coursesStyles'

export type CourseManagerHomeProps = { course: me_me_Teacher_teachesCourses }

export const TOGGLE_ALLOW_ASSIGNMENTS_IN_CLASS_MUTATION = gql`
  mutation toggleAssignmentsAllowedInClass(
    $input: ToggleAssignmentsAllowedInClassInput!
  ) {
    toggleAssignmentsAllowedInClass(input: $input) {
      toggled
    }
  }
`

export const TOGGLE_READING_GUIDE_CHECK_MUTATION = gql`
  mutation toggleReadingGuideCheck($input: ToggleReadingGuideCheckInput!) {
    toggleReadingGuideCheck(input: $input) {
      toggled
    }
  }
`
export const CourseManagerHome = ({ course }: CourseManagerHomeProps) => {
  const navigate = useNavigate()
  const [navState, event] = useTeacherNavContextProvider()
  const [toggleAssignmentsAllowedInClass] = useMutation<
    toggleAssignmentsAllowedInClass,
    toggleAssignmentsAllowedInClassVariables
  >(TOGGLE_ALLOW_ASSIGNMENTS_IN_CLASS_MUTATION, {
    variables: { input: { courseId: course._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })

  const [toggleReadingGuideCheck] = useMutation<
    toggleReadingGuideCheck,
    toggleReadingGuideCheckVariables
  >(TOGGLE_READING_GUIDE_CHECK_MUTATION, {
    variables: { input: { courseId: course._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })
  return (
    <CourseManagerHomeContainer>
      <CourseManagerHomeTitle>
        <div>
          <CourseManagerHomeTitleBackLink
            onClick={() => navigate('/dashboard/courses')}
          >
            ←Back
          </CourseManagerHomeTitleBackLink>
        </div>
        <div>{course.name} Menu</div>
        <div></div>
      </CourseManagerHomeTitle>
      <CourseMenuContainer>
        <CourseMenuItemBlock>
          <AssignmentControlDisplayContainer>
            <div>
              Assignments in Class:{' '}
              {course.hasCourseInfo.assignmentsAllowedInClass
                ? 'Allowed'
                : 'Not Allowed'}
            </div>
            <button onClick={() => toggleAssignmentsAllowedInClass()}>
              {course.hasCourseInfo.assignmentsAllowedInClass
                ? 'Disable '
                : 'Enable '}{' '}
              Assignments Allowed
            </button>
          </AssignmentControlDisplayContainer>
          <AssignmentControlDisplayContainer>
            <div>
              Reading Guide Check:{' '}
              {course.hasCourseInfo.checkReadingGuides ? 'Enabled' : 'Disabled'}
            </div>
            <button onClick={() => toggleReadingGuideCheck()}>
              {course.hasCourseInfo.checkReadingGuides ? 'Disable' : 'Enable'}{' '}
              Reading Guide Check
            </button>
          </AssignmentControlDisplayContainer>
        </CourseMenuItemBlock>
        <CourseMenuItemBlockLink to="assignment-manager">
          Grade Download
        </CourseMenuItemBlockLink>
        <CourseMenuItemBlockLink to="roster">Roster</CourseMenuItemBlockLink>
        <CourseMenuItemBlockLink to="edit-course">
          Edit Course
        </CourseMenuItemBlockLink>
        <CourseMenuItemBlockLink to="course-info">
          Course Information
        </CourseMenuItemBlockLink>
        <CourseMenuItemBlock></CourseMenuItemBlock>
      </CourseMenuContainer>
    </CourseManagerHomeContainer>
  )
}

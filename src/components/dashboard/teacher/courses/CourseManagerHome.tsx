import { gql, useMutation } from '@apollo/client'
import React from 'react'
import { useNavigate } from 'react-router'
import { useTeacherNavContextProvider } from '../../../../navigation/teacher-nav/TeacherNavContext'
import {
  me_me_Teacher_teachesCourses,
  toggleAssignmentsAllowedInClass,
  toggleAssignmentsAllowedInClassVariables,
} from '../../../../schemaTypes'
import {
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
        </CourseMenuItemBlock>
        <CourseMenuItemBlockLink to='assignment-manager'>
          Grade Download
        </CourseMenuItemBlockLink>
        <CourseMenuItemBlockLink to='roster'>Roster</CourseMenuItemBlockLink>
        <CourseMenuItemBlockLink to='edit-course'>
          Edit Course
        </CourseMenuItemBlockLink>
        <CourseMenuItemBlock></CourseMenuItemBlock>
        <CourseMenuItemBlock></CourseMenuItemBlock>
      </CourseMenuContainer>
    </CourseManagerHomeContainer>
  )
}

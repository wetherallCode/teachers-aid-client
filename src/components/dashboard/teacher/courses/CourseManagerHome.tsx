import { gql, useMutation } from '@apollo/client'
import React from 'react'
import {
  me_me_Teacher_teachesCourses,
  toggleAssignmentsAllowedInClass,
  toggleAssignmentsAllowedInClassVariables,
} from '../../../../schemaTypes'

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
  const [toggleAssignmentsAllowedInClass] = useMutation<
    toggleAssignmentsAllowedInClass,
    toggleAssignmentsAllowedInClassVariables
  >(TOGGLE_ALLOW_ASSIGNMENTS_IN_CLASS_MUTATION, {
    variables: { input: { courseId: course._id! } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['me'],
  })
  return (
    <>
      <div>{course.name}</div>
      <button onClick={() => toggleAssignmentsAllowedInClass()}>
        {course.hasCourseInfo.assignmentsAllowedInClass
          ? 'Disable '
          : 'Enable '}{' '}
        Assignments Allowed
      </button>
    </>
  )
}

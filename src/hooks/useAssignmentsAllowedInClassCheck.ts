import { gql, useQuery } from '@apollo/client'
import {
  checkAssignmentsAllowedInClass,
  checkAssignmentsAllowedInClassVariables,
  me_me_Student,
} from '../schemaTypes'
import { useTime } from './useTime'

export const CHECK_ASSIGNMENTS_ALLOWED_QUERY = gql`
  query checkAssignmentsAllowedInClass(
    $input: CheckAssignmentsAllowedInClassInput!
  ) {
    checkAssignmentsAllowedInClass(input: $input) {
      allowed
    }
  }
`
export const useAssignmentsAllowedInClassCheck = (me: me_me_Student) => {
  const { loading, data } = useQuery<
    checkAssignmentsAllowedInClass,
    checkAssignmentsAllowedInClassVariables
  >(CHECK_ASSIGNMENTS_ALLOWED_QUERY, {
    variables: {
      input: { courseId: me.inCourses[0]._id! },
    },
    // onCompleted: (data) => console.log(data),
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })

  return {
    assignmentsAllowedInClass: data?.checkAssignmentsAllowedInClass.allowed
      ? true
      : false,
  }
}

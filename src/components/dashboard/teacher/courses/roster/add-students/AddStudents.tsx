import React, { FC } from 'react'
import { RegisterStudent } from './register-student/RegisterStudent'
import { useParams } from 'react-router'
import { useAddStudentsContextProvider } from './state-n-styles/AddStudentsContext'
import { AddToCourse } from './add-to-course/AddToCourse'
import {
  findCourseByIdForStudentRegistration,
  findCourseByIdForStudentRegistrationVariables,
} from '../../../../../../schemaTypes'
import { useQuery, gql } from '@apollo/client'
import {
  BottomButton,
  FullScreenButtonContainer,
} from './state-n-styles/addStudentsStyles'

export type AddStudentsProps = {}

export const FIND_COURSE_BY_ID_QUERY = gql`
  query findCourseByIdForStudentRegistration($input: FindCourseByIdInput!) {
    findCourseById(input: $input) {
      course {
        _id
        hasStudents {
          _id
          firstName
          lastName
          virtual
          cohort
        }
        hasCourseInfo {
          _id
          courseType
          cohortBasedSeating
          assignedSeats {
            deskNumber
            student {
              _id
              firstName
              lastName
            }
            deskNumber
            redCohortStudent {
              _id
              firstName
              lastName
            }
            whiteCohortStudent {
              _id
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`

export const AddStudents: FC<AddStudentsProps> = () => {
  const { course } = useParams()
  const [state, event] = useAddStudentsContextProvider()
  const { loading, data } = useQuery<
    findCourseByIdForStudentRegistration,
    findCourseByIdForStudentRegistrationVariables
  >(FIND_COURSE_BY_ID_QUERY, {
    variables: {
      input: { courseId: course },
    },
    // onCompleted: (data) => console.log(data.findCourseById.course),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  return (
    <div>
      {state.matches('idle') && (
        <FullScreenButtonContainer>
          <BottomButton onClick={() => event({ type: 'REGISTER' })}>
            Register First
          </BottomButton>
          <BottomButton onClick={() => event({ type: 'ADD_TO_COURSE' })}>
            Add Students To Course
          </BottomButton>
        </FullScreenButtonContainer>
      )}
      {state.matches('register') && <RegisterStudent />}
      {state.matches('addToCourse') && (
        <AddToCourse course={data?.findCourseById.course!} />
      )}
    </div>
  )
}

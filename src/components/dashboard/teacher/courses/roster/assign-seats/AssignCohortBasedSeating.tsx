import React, { FC, useState } from 'react'
import { gql, useMutation, MutationFunctionOptions } from '@apollo/client'
import {
  assignCohortBasedSeats,
  assignCohortBasedSeatsVariables,
  findCourseByIdForStudentRegistration_findCourseById_course,
  StudentCohortEnum,
  removeCohortBasedSeat,
  removeCohortBasedSeatVariables,
} from '../../../../../../schemaTypes'
import { AssignWhiteCohort } from './AssignWhiteCohort'
import { AssignRedCohort } from './AssignRedCohort'

export type AssignCohortBasedSeatingProps = {
  course: findCourseByIdForStudentRegistration_findCourseById_course
}

export const ASSIGN_COHORT_BASED_SEATS_MUTATION = gql`
  mutation assignCohortBasedSeats($input: AssignSeatsInput!) {
    assignSeats(input: $input) {
      courseInfo {
        _id
        assignedSeats {
          deskNumber
          student {
            _id
            firstName
          }
          redCohortStudent {
            _id
            firstName
          }
          whiteCohortStudent {
            _id
            firstName
          }
        }
      }
    }
  }
`

export const REMOVE_COHORT_BASED_SEAT_MUTATION = gql`
  mutation removeCohortBasedSeat($input: RemoveAssignedSeatInput!) {
    removeAssignedSeat(input: $input) {
      courseInfo {
        _id
      }
    }
  }
`

export type RemoveAssignedSeatType = (
  options?:
    | MutationFunctionOptions<
        removeCohortBasedSeat,
        removeCohortBasedSeatVariables
      >
    | undefined
) => void

export type AssignSeatType = (
  options?:
    | MutationFunctionOptions<
        assignCohortBasedSeats,
        assignCohortBasedSeatsVariables
      >
    | undefined
) => void

export const AssignCohortBasedSeating: FC<AssignCohortBasedSeatingProps> = ({
  course,
}) => {
  const [cohortSelect, setCohortSelect] = useState<StudentCohortEnum>(
    StudentCohortEnum.RED
  )
  const [assignSeats] = useMutation<
    assignCohortBasedSeats,
    assignCohortBasedSeatsVariables
  >(ASSIGN_COHORT_BASED_SEATS_MUTATION, {
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findCourseByIdForStudentRegistration'],
  })

  const [removeAssignedSeat] = useMutation<
    removeCohortBasedSeat,
    removeCohortBasedSeatVariables
  >(REMOVE_COHORT_BASED_SEAT_MUTATION, {
    // variables: { input: {  } },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findCourseByIdForStudentRegistration'],
  })

  console.log(course.hasStudents.map((student) => student.cohort))

  return (
    <>
      <div>Select Cohort</div>
      <button onClick={() => setCohortSelect(StudentCohortEnum.RED)}>
        Red
      </button>
      <button onClick={() => setCohortSelect(StudentCohortEnum.WHITE)}>
        White
      </button>
      {cohortSelect === StudentCohortEnum.RED ? (
        <AssignRedCohort
          course={course}
          assignSeats={assignSeats}
          removeAssignedSeat={removeAssignedSeat}
        />
      ) : (
        <AssignWhiteCohort
          course={course}
          assignSeats={assignSeats}
          removeAssignedSeat={removeAssignedSeat}
        />
      )}
    </>
  )
}

import React from 'react'
import {
  findAllStudentsForStudentInformation_findAllStudents_students,
  updateAssignmentLockVariables,
  updateAssignmentLock,
  findStudentById,
  findStudentByIdVariables,
} from '../../../../../schemaTypes'
import { gql, useMutation, useQuery } from '@apollo/client'
export type ClassWorkLockDisplayProps = {
  studentId: string
}
export const UPDATE_CLASSWORK_LOCK_MUTATION = gql`
  mutation updateAssignmentLock($input: UpdateAssignmentLockInput!) {
    updateAssignmentLock(input: $input) {
      updated
    }
  }
`
export const FIND_STUDENT_BY_ID_QUERY = gql`
  query findStudentById($input: FindStudentByIdInput!) {
    findStudentById(input: $input) {
      student {
        _id
        hasAssignmentsLocked
      }
    }
  }
`
/**
 * ClassWorkLockDisplay component.
 * This component is responsible for displaying the class work lock status.
 */
export const ClassWorkLockDisplay = ({
  studentId,
}: ClassWorkLockDisplayProps) => {
  const { loading, data } = useQuery<findStudentById, findStudentByIdVariables>(
    FIND_STUDENT_BY_ID_QUERY,
    {
      variables: {
        input: { studentId },
      },
      onCompleted: (data) => console.log(data),
      onError: (error) => console.error(error),
    },
  )
  const [updateAssignmentLock] = useMutation<
    updateAssignmentLock,
    updateAssignmentLockVariables
  >(UPDATE_CLASSWORK_LOCK_MUTATION, {
    variables: {
      input: {
        studentId,
      },
    },
    onCompleted: (data) => console.log(data),
    refetchQueries: ['findStudentById'],
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      <div>
        <button
          style={{
            color: 'var(--blue)',
            backgroundColor: 'var(--white)',
            fontSize: '2vh',
          }}
          onClick={() => updateAssignmentLock()}
        >
          {data?.findStudentById.student.hasAssignmentsLocked
            ? 'Work Locked'
            : 'Work Unlocked'}
        </button>{' '}
      </div>
    </>
  )
}

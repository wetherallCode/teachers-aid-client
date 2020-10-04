import { gql, useQuery } from '@apollo/client'
import React, { FC } from 'react'
import {
  findStudentsByCourseForParentContacts,
  findStudentsByCourseForParentContactsVariables,
} from '../../../../../schemaTypes'
import { useCreateContactContextProvider } from './state-style/CreateContactContext'

export type FindAllStudentsProps = {}

export const FIND_ALL_STUDENTS_QUERY = gql`
  query findStudentsByCourseForParentContacts(
    $input: FindStudentsByCourseInput!
  ) {
    findStudentsByCourse(input: $input) {
      students {
        _id
        firstName
        lastName
      }
    }
  }
`
export const FindAllStudents: FC<FindAllStudentsProps> = () => {
  const [state, event] = useCreateContactContextProvider()
  const { loading, data } = useQuery<
    findStudentsByCourseForParentContacts,
    findStudentsByCourseForParentContactsVariables
  >(FIND_ALL_STUDENTS_QUERY, {
    variables: {
      input: { courseId: state.context.courseId },
    },
    onCompleted: (data) => console.log(data),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  return (
    <>
      {data?.findStudentsByCourse.students.map((student) => (
        <div
          key={student._id!}
          onClick={() => {
            event({ type: 'SET_STUDENT_ID', payload: student._id! })
            event({
              type: 'SET_STUDENT_NAME',
              payload: student.firstName + ' ' + student.lastName,
            })
            event({ type: 'SET_COURSE_ID', payload: '' })
          }}
        >
          {student.lastName}, {student.firstName}
        </div>
      ))}
    </>
  )
}

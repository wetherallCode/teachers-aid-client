import React, { FC, useState } from 'react'
import {
  findStudentsByCourse,
  findStudentsByCourseVariables,
} from '../../../../../../schemaTypes'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

export type FindAssignmentByStudentProps = {
  courseId: string
}

export const FIND_STUDENTS_BY_COURSE_ID_QUERY = gql`
  query findStudentsByCourse($input: FindStudentsByCourseInput!) {
    findStudentsByCourse(input: $input) {
      students {
        _id
        firstName
        lastName
        hasAssignments {
          _id
          __typename
          markingPeriod
          readings {
            readingSections
          }
        }
      }
    }
  }
`

export const FindAssignmentByStudent: FC<FindAssignmentByStudentProps> = ({
  courseId,
}) => {
  const [studentId, setStudentId] = useState('')
  const [assignmentId, setAssignmentId] = useState('')
  const navigate = useNavigate()
  const { loading, data } = useQuery<
    findStudentsByCourse,
    findStudentsByCourseVariables
  >(FIND_STUDENTS_BY_COURSE_ID_QUERY, {
    variables: {
      input: { courseId },
    },
    // onCompleted: (data) =>
    //   console.log(data.findStudentsByCourse.students[0].hasAssignments),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>
  const [student] = data?.findStudentsByCourse.students!.filter(
    (student) => student._id === studentId
  )

  return (
    <>
      <select
        onChange={(e: any) => {
          if (e.target.value !== 'none') {
            setStudentId(e.target.value)
          }
        }}
      >
        <option value={'none'}>Pick a Student</option>
        {data?.findStudentsByCourse.students.map((student) => (
          <option key={student._id!} value={student._id!}>
            {student.lastName}, {student.firstName}
          </option>
        ))}
      </select>
      {student && (
        <div>
          <div>Essays</div>
          <select
            onChange={(e: any) => {
              if (e.target.value !== 'none') setAssignmentId(e.target.value)
            }}
          >
            <option value={'none'}>Pick an Essay</option>
            {student.hasAssignments
              .filter((assignment) => assignment.__typename === 'Essay')
              .map((assignment) => (
                <option key={assignment._id!} value={assignment._id!}>
                  {assignment.readings.readingSections}
                </option>
              ))}
          </select>
          {assignmentId && (
            <div onClick={() => navigate(`paper-based/${assignmentId}`)}>
              Set Paper Based
            </div>
          )}
        </div>
      )}
    </>
  )
}

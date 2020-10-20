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
          ... on Essay {
            finalDraft {
              submitted
            }
          }
          ... on ReadingGuide {
            readingGuideFinal {
              submitted
            }
            graded
          }
        }
      }
    }
  }
`

export const FindAssignmentByStudent: FC<FindAssignmentByStudentProps> = ({
  courseId,
}) => {
  const navigate = useNavigate()
  const [studentId, setStudentId] = useState('')

  const [essayId, setEssayId] = useState('')
  const [readingGuideId, setReadingGuideId] = useState('')

  // const [assignmentType, setAssignmentType] = useState<
  //   'Test' | 'Essay' | 'ReadingGuide'
  // >('Essay')
  const { loading, data } = useQuery<
    findStudentsByCourse,
    findStudentsByCourseVariables
  >(FIND_STUDENTS_BY_COURSE_ID_QUERY, {
    variables: {
      input: { courseId },
    },
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
        <>
          <div>
            <div>Essays</div>
            <select
              onChange={(e: any) => {
                if (e.target.value !== 'none') setEssayId(e.target.value)
              }}
            >
              <option value={'none'}>Pick an Essay</option>
              {student.hasAssignments
                .filter(
                  (assignment) =>
                    assignment.__typename === 'Essay' &&
                    !assignment.finalDraft?.submitted
                )
                .map((assignment) => (
                  <option key={assignment._id!} value={assignment._id!}>
                    {assignment.readings.readingSections}
                  </option>
                ))}
            </select>
            {essayId && (
              <div onClick={() => navigate(`paper-based/${essayId}`)}>
                Set Paper Based
              </div>
            )}
          </div>
          <div>
            <div>Reading Guides</div>
            <select
              onChange={(e: any) => {
                if (e.target.value !== 'none') setReadingGuideId(e.target.value)
              }}
            >
              <option value={'none'}>Pick an Reading Guide</option>
              {student.hasAssignments
                .filter(
                  (assignment) =>
                    assignment.__typename === 'ReadingGuide' &&
                    !assignment.readingGuideFinal?.submitted &&
                    !assignment.graded
                )
                .map((assignment) => (
                  <option key={assignment._id!} value={assignment._id!}>
                    {assignment.readings.readingSections}
                  </option>
                ))}
            </select>
            {readingGuideId && (
              <div onClick={() => navigate(`paper-based/${readingGuideId}`)}>
                Set Paper Based
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

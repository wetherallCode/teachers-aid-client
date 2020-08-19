import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findRosterByCourse,
  findRosterByCourseVariables,
} from '../../../../../../schemaTypes'

export type ViewRosterProps = {}

export const FIND_ROSTER_BY_COURSE_QUERY = gql`
  query findRosterByCourse($input: FindCourseByIdInput!) {
    findCourseById(input: $input) {
      course {
        hasCourseInfo {
          assignedSeats {
            deskNumber
            student {
              _id
              userName
              lastName
              firstName
              # hasWritingMetrics {
              #   overallWritingMetric {
              #     overallWritingLevel
              #     levelPoints
              #   }
              # }
              hasProtocols {
                completed
                assessment
                discussionLevel
              }
              hasUnExcusedLatenesses {
                markingPeriod
                dayLate
              }
              hasExcusedLatenesses {
                markingPeriod
                dayLateExcused
              }
              hasAbsences {
                markingPeriod
                dayAbsent
              }
              # hasContactInformation {
              #   contactInfo {
              #     guardianEmail
              #     guardianFirstName
              #     guardianLastName
              #     guardianPhone
              #   }
              # }
              hasAssignments {
                __typename
              }
            }
          }
        }
      }
    }
  }
`

export const ViewRoster: FC<ViewRosterProps> = () => {
  const { course } = useParams()
  const { loading, data } = useQuery<
    findRosterByCourse,
    findRosterByCourseVariables
  >(FIND_ROSTER_BY_COURSE_QUERY, {
    variables: {
      input: { courseId: course },
    },
    onCompleted: (data) =>
      console.log(
        data.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
          (seat) => seat.student
        )
      ),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const students = data?.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
    (seat) => seat.student!
  )
  return (
    <>
      <div>Roster</div>
      <div>
        {students?.map((student) => (
          <div key={student.student?._id!}>
            <div>
              {student.student?.lastName}, {student.student?.firstName}:{' '}
              {student.student?.userName}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

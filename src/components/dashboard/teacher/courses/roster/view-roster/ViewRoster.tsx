import React, { FC } from 'react'
import { useParams } from 'react-router'
import { gql, useQuery } from '@apollo/client'
import {
  findRosterByCourse,
  findRosterByCourseVariables,
  findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats,
} from '../../../../../../schemaTypes'
import {
  RosterItems,
  RosterItemsContainer,
  ViewRosterContainer,
  ViewRosterTitle,
} from '../RosterDashboardStyles'

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
                dayLate
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
      input: { courseId: course! },
    },
    onCompleted: (data) =>
      console.log(
        data.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
          (seat) => seat.student,
        ),
      ),
    onError: (error) => console.error(error),
  })
  if (loading) return <div>Loading </div>

  const students =
    data?.findCourseById.course.hasCourseInfo?.assignedSeats.filter(
      (seat) => seat.student!,
    )

  const sortByLetter = (
    a: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats,
    b: findRosterByCourse_findCourseById_course_hasCourseInfo_assignedSeats,
  ) => {
    let nameA = a.student?.lastName.toUpperCase()
    let nameB = b.student?.lastName.toUpperCase()
    if (nameA! < nameB!) {
      return -1
    }
    if (nameA! > nameB!) {
      return 1
    }

    // names must be equal
    return 0
  }
  console.log(students?.sort(sortByLetter))
  return (
    <ViewRosterContainer>
      <ViewRosterTitle>Assigned Seats</ViewRosterTitle>
      <RosterItemsContainer>
        {students?.sort(sortByLetter).map((student, i: number) => (
          <RosterItems highlighted={i % 2 === 0} key={student.student?._id!}>
            <div>
              {student.student?.lastName}, {student.student?.firstName}
            </div>
            <div>{student.deskNumber}</div>
          </RosterItems>
        ))}
      </RosterItemsContainer>
    </ViewRosterContainer>
  )
}

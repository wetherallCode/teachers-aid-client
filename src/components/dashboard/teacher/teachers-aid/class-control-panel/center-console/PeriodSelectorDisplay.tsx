import React, { FC } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import {
  findCourseInfoByCourseId,
  findCourseInfoByCourseIdVariables,
  me_me_Teacher,
} from '../../../../../../schemaTypes'
import { useTeachersAidContextProvider } from '../../state/TeachersAidContext'
import { CourseSelectButton } from '../../styles/classControlPanelStyles'
import { useUserContextProvider } from '../../../../../../contexts/UserContext'

export type PeriodSelectorDisplayProps = {}

export const GET_COURSE_INFO_QUERY = gql`
  query findCourseInfoByCourseId($input: FindCourseInfoByCourseIdInput!) {
    findCourseInfoByCourseId(input: $input) {
      courseInfo {
        _id
        startsAt
        course {
          _id
          name
          hasStudents {
            _id
            firstName
            schoolId
            lastName
            cohort
            hasAbsences {
              dayAbsent
            }
            hasProtocols {
              _id
              student {
                _id
                firstName
                lastName
              }
              isActive
              response
            }
          }
        }
        endsAt
        schoolDayType
        cohortBasedSeating
        assignedSeats {
          deskNumber
          redCohortStudent {
            _id
            firstName
            lastName
            cohort
            hasAbsences {
              dayAbsent
            }
          }
          whiteCohortStudent {
            _id
            firstName
            lastName
            cohort
            hasAbsences {
              dayAbsent
            }
          }
          student {
            _id
            firstName
            lastName
            cohort
            hasAbsences {
              dayAbsent
            }
          }
        }
      }
    }
  }
`
export const PeriodSelectorDisplay: FC<PeriodSelectorDisplayProps> = () => {
  const me: me_me_Teacher = useUserContextProvider()
  const [, event] = useTeachersAidContextProvider()
  const [loadCourse] = useLazyQuery<
    findCourseInfoByCourseId,
    findCourseInfoByCourseIdVariables
  >(GET_COURSE_INFO_QUERY, {
    onCompleted: (data) =>
      event({
        type: 'SET_COURSE',
        payload: data.findCourseInfoByCourseId.courseInfo,
      }),
    pollInterval: 1000,
    onError: (error) => console.error(error),
  })

  return (
    <>
      {me.teachesCourses.map((course) => (
        <CourseSelectButton
          key={course._id!}
          onClick={() => {
            loadCourse({ variables: { input: { courseId: course._id! } } })
          }}
        >
          {course.name}
        </CourseSelectButton>
      ))}
    </>
  )
}

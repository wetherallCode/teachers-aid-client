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
        }
        endsAt
        schoolDayType
        course {
          name
        }
        assignedSeats {
          deskNumber
          student {
            _id
            firstName
            lastName
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
    onError: (error) => console.error(error),
  })
  console.log(me)
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
